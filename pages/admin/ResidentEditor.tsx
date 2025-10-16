import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResidentContext } from '../../context/ResidentContext';
import { Resident } from '../../types';

const ResidentEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { residents, addResident, updateResident } = useContext(ResidentContext);

    const isEditing = id !== undefined;
    const itemToEdit = isEditing ? residents.find(r => r.id === id) : null;

    const [formData, setFormData] = useState<Omit<Resident, 'id' | 'created_at' | 'updated_at'>>({
        nik: '',
        no_kk: '',
        nama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: 'Laki-laki',
        alamat: '',
        rt: '',
        rw: '',
        agama: 'Islam',
        status_perkawinan: 'Belum Kawin',
        pekerjaan: '',
        kewarganegaraan: 'WNI',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditing && itemToEdit) {
            const { id, created_at, updated_at, ...editableData } = itemToEdit;
            setFormData(editableData);
        }
    }, [id, isEditing, itemToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!/^\d{16}$/.test(formData.nik) || !/^\d{16}$/.test(formData.no_kk)) {
            setError('NIK dan No. KK harus terdiri dari 16 digit angka.');
            return;
        }

        if (isEditing && itemToEdit) {
            await updateResident({ ...formData, id: itemToEdit.id, created_at: itemToEdit.created_at, updated_at: itemToEdit.updated_at });
        } else {
            await addResident(formData);
        }
        navigate('/admin/penduduk');
    };
    
    const commonInputClass = "mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500";

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                {isEditing ? 'Edit Data Penduduk' : 'Tambah Data Penduduk'}
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">{error}</div>}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                            <input type="text" name="nik" id="nik" value={formData.nik} onChange={handleChange} required maxLength={16} className={commonInputClass} />
                        </div>
                        <div>
                            <label htmlFor="no_kk" className="block text-sm font-medium text-gray-700">No. Kartu Keluarga</label>
                            <input type="text" name="no_kk" id="no_kk" value={formData.no_kk} onChange={handleChange} required maxLength={16} className={commonInputClass} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                        <input type="text" name="nama" id="nama" value={formData.nama} onChange={handleChange} required className={commonInputClass} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="tempat_lahir" className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                            <input type="text" name="tempat_lahir" id="tempat_lahir" value={formData.tempat_lahir} onChange={handleChange} required className={commonInputClass} />
                        </div>
                        <div>
                            <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                            <input type="date" name="tanggal_lahir" id="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} required className={commonInputClass} />
                        </div>
                    </div>

                     <div>
                        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                        <textarea name="alamat" id="alamat" rows={2} value={formData.alamat} onChange={handleChange} required className={commonInputClass} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="rt" className="block text-sm font-medium text-gray-700">RT</label>
                            <input type="text" name="rt" id="rt" value={formData.rt} onChange={handleChange} required className={commonInputClass} />
                        </div>
                         <div>
                            <label htmlFor="rw" className="block text-sm font-medium text-gray-700">RW</label>
                            <input type="text" name="rw" id="rw" value={formData.rw} onChange={handleChange} required className={commonInputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                            <select name="jenis_kelamin" id="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className={commonInputClass}>
                                <option>Laki-laki</option>
                                <option>Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="agama" className="block text-sm font-medium text-gray-700">Agama</label>
                             <select name="agama" id="agama" value={formData.agama} onChange={handleChange} className={commonInputClass}>
                                <option>Islam</option>
                                <option>Kristen</option>
                                <option>Katolik</option>
                                <option>Hindu</option>
                                <option>Budha</option>
                                <option>Khonghucu</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="status_perkawinan" className="block text-sm font-medium text-gray-700">Status Perkawinan</label>
                            <select name="status_perkawinan" id="status_perkawinan" value={formData.status_perkawinan} onChange={handleChange} className={commonInputClass}>
                                <option>Belum Kawin</option>
                                <option>Kawin</option>
                                <option>Cerai Hidup</option>
                                <option>Cerai Mati</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pekerjaan" className="block text-sm font-medium text-gray-700">Pekerjaan</label>
                            <input type="text" name="pekerjaan" id="pekerjaan" value={formData.pekerjaan} onChange={handleChange} required className={commonInputClass} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="kewarganegaraan" className="block text-sm font-medium text-gray-700">Kewarganegaraan</label>
                        <select name="kewarganegaraan" id="kewarganegaraan" value={formData.kewarganegaraan} onChange={handleChange} className={commonInputClass}>
                            <option>WNI</option>
                            <option>WNA</option>
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button type="button" onClick={() => navigate('/admin/penduduk')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                            Batal
                        </button>
                        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                            {isEditing ? 'Simpan Perubahan' : 'Simpan Data'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResidentEditor;