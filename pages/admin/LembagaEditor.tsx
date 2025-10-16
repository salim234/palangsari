import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LembagaContext } from '../../context/LembagaContext';
import { LembagaDesa } from '../../types';

const LembagaEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { lembaga, addLembaga, updateLembaga } = useContext(LembagaContext);
  
  const isEditing = id !== undefined;
  const itemToEdit = isEditing ? lembaga.find(l => l.id === id) : null;

  const [formData, setFormData] = useState<Omit<LembagaDesa, 'id' | 'created_at' | 'updated_at'>>({
    nama: '',
    singkatan: '',
    deskripsi: '',
    ketua: '',
  });
  
  useEffect(() => {
    if (isEditing && itemToEdit) {
      const { id, created_at, updated_at, ...editableData } = itemToEdit;
      setFormData(editableData);
    }
  }, [id, isEditing, itemToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && itemToEdit) {
      await updateLembaga({ ...formData, id: itemToEdit.id, created_at: itemToEdit.created_at, updated_at: itemToEdit.updated_at });
    } else {
      await addLembaga(formData);
    }
    navigate('/admin/lembaga');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Lembaga Desa' : 'Tambah Lembaga Desa'}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Lembaga</label>
            <input type="text" name="nama" id="nama" value={formData.nama} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="singkatan" className="block text-sm font-medium text-gray-700">Singkatan</label>
            <input type="text" name="singkatan" id="singkatan" value={formData.singkatan} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="ketua" className="block text-sm font-medium text-gray-700">Nama Ketua</label>
            <input type="text" name="ketua" id="ketua" value={formData.ketua} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea name="deskripsi" id="deskripsi" rows={4} value={formData.deskripsi} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/admin/lembaga')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              {isEditing ? 'Simpan Perubahan' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LembagaEditor;