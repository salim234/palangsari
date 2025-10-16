import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OfficialContext } from '../../context/OfficialContext';
import { Official } from '../../types';

const OfficialEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { officials, addOfficial, updateOfficial } = useContext(OfficialContext);
  
  const isEditing = id !== undefined;
  const itemToEdit = isEditing ? officials.find(o => o.id === id) : null;

  const [formData, setFormData] = useState<Omit<Official, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    position: '',
    image_url: '',
  });
  
  useEffect(() => {
    if (isEditing && itemToEdit) {
        const { id, created_at, updated_at, ...editableData } = itemToEdit;
        setFormData(editableData);
    }
  }, [id, isEditing, itemToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && itemToEdit) {
      await updateOfficial({ ...formData, id: itemToEdit.id, created_at: itemToEdit.created_at, updated_at: itemToEdit.updated_at });
    } else {
      await addOfficial(formData);
    }
    navigate('/admin/perangkat');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Jabatan</label>
            <input type="text" name="position" id="position" value={formData.position} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
           <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL Foto</label>
            <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="https://picsum.photos/seed/..." />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/admin/perangkat')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
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

export default OfficialEditor;