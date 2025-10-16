import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { APBDesContext } from '../../context/APBDesContext';
import { APBDesData, APBDesItem } from '../../types';

const ItemRow: React.FC<{
    item: APBDesItem;
    index: number;
    type: keyof Omit<APBDesData, 'tahun' | 'created_at' | 'updated_at'>;
    onChange: (index: number, type: keyof Omit<APBDesData, 'tahun' | 'created_at' | 'updated_at'>, field: keyof APBDesItem, value: string | number) => void;
    onRemove: (index: number, type: keyof Omit<APBDesData, 'tahun' | 'created_at' | 'updated_at'>) => void;
}> = ({ item, index, type, onChange, onRemove }) => (
    <div className="grid grid-cols-12 gap-2 mb-2 items-center">
        <input type="text" value={item.kode} onChange={(e) => onChange(index, type, 'kode', e.target.value)} placeholder="Kode" className="col-span-2 shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        <input type="text" value={item.uraian} onChange={(e) => onChange(index, type, 'uraian', e.target.value)} placeholder="Uraian" className="col-span-4 shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        <input type="number" value={item.anggaran} onChange={(e) => onChange(index, type, 'anggaran', Number(e.target.value))} placeholder="Anggaran" className="col-span-2 shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        <input type="number" value={item.realisasi} onChange={(e) => onChange(index, type, 'realisasi', Number(e.target.value))} placeholder="Realisasi" className="col-span-2 shadow-sm sm:text-sm border-gray-300 rounded-md"/>
        <button type="button" onClick={() => onRemove(index, type)} className="col-span-2 text-red-500 hover:text-red-700 justify-self-center">Hapus</button>
    </div>
);

const SectionEditor: React.FC<{
    title: string;
    items: APBDesItem[];
    type: keyof Omit<APBDesData, 'tahun'| 'created_at' | 'updated_at'>;
    onItemChange: (index: number, type: keyof Omit<APBDesData, 'tahun'| 'created_at' | 'updated_at'>, field: keyof APBDesItem, value: string | number) => void;
    onItemRemove: (index: number, type: keyof Omit<APBDesData, 'tahun'| 'created_at' | 'updated_at'>) => void;
    onItemAdd: (type: keyof Omit<APBDesData, 'tahun'| 'created_at' | 'updated_at'>) => void;
}> = ({ title, items, type, onItemChange, onItemRemove, onItemAdd }) => (
    <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {items.map((item, index) => (
            <ItemRow key={index} item={item} index={index} type={type} onChange={onItemChange} onRemove={onItemRemove} />
        ))}
        <button type="button" onClick={() => onItemAdd(type)} className="text-sm text-emerald-600 hover:text-emerald-800 font-semibold">+ Tambah Baris</button>
    </div>
);

const APBDesEditor: React.FC = () => {
    const { year } = useParams<{ year: string }>();
    const navigate = useNavigate();
    const { data, addData, updateData } = useContext(APBDesContext);

    const isEditing = year !== undefined;
    const itemToEdit = isEditing ? data.find(d => d.tahun === parseInt(year)) : null;
    
    const [formData, setFormData] = useState<Omit<APBDesData, 'created_at' | 'updated_at'>>({
        tahun: new Date().getFullYear(),
        pendapatan: [],
        belanja: [],
        pembiayaan: [],
    });

    useEffect(() => {
        if (isEditing && itemToEdit) {
            const { created_at, updated_at, ...editableData } = itemToEdit;
            setFormData(editableData);
        }
    }, [year, isEditing, itemToEdit]);

    const handleItemChange = (index: number, type: keyof Omit<APBDesData, 'tahun' | 'created_at' | 'updated_at'>, field: keyof APBDesItem, value: string | number) => {
        const newItems = [...formData[type]];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData(prev => ({ ...prev, [type]: newItems }));
    };

    const handleItemRemove = (index: number, type: keyof Omit<APBDesData, 'tahun' | 'created_at' | 'updated_at'>) => {
        const newItems = formData[type].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, [type]: newItems }));
    };

    const handleItemAdd = (type: keyof Omit<APBDesData, 'tahun' | 'created_at' | 'updated_at'>) => {
        const newItem: APBDesItem = { kode: '', uraian: '', anggaran: 0, realisasi: 0 };
        setFormData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            await updateData(formData);
        } else {
            if(data.some(d => d.tahun === formData.tahun)) {
                alert(`Data untuk tahun ${formData.tahun} sudah ada.`);
                return;
            }
            await addData(formData);
        }
        navigate('/admin/apbdes');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {isEditing ? `Edit Data APBDes Tahun ${year}` : 'Tambah Data APBDes Baru'}
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="tahun" className="block text-sm font-medium text-gray-700">Tahun Anggaran</label>
                        <input
                            type="number"
                            name="tahun"
                            id="tahun"
                            value={formData.tahun}
                            onChange={(e) => setFormData(prev => ({ ...prev, tahun: Number(e.target.value) }))}
                            required
                            disabled={isEditing}
                            className="mt-1 block w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100"
                        />
                    </div>
                    
                    <SectionEditor 
                        title="Pendapatan"
                        items={formData.pendapatan}
                        type="pendapatan"
                        onItemChange={handleItemChange}
                        onItemRemove={handleItemRemove}
                        onItemAdd={handleItemAdd}
                    />

                    <SectionEditor 
                        title="Belanja"
                        items={formData.belanja}
                        type="belanja"
                        onItemChange={handleItemChange}
                        onItemRemove={handleItemRemove}
                        onItemAdd={handleItemAdd}
                    />
                    
                     <SectionEditor 
                        title="Pembiayaan"
                        items={formData.pembiayaan}
                        type="pembiayaan"
                        onItemChange={handleItemChange}
                        onItemRemove={handleItemRemove}
                        onItemAdd={handleItemAdd}
                    />
                    
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button type="button" onClick={() => navigate('/admin/apbdes')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            Batal
                        </button>
                        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                            Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default APBDesEditor;