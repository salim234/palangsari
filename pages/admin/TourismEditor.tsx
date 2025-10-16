import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TourismContext } from '../../context/TourismContext';
import { TourismSpot } from '../../types';

const TourismEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { spots, addSpot, updateSpot } = useContext(TourismContext);
  
  const isEditing = id !== undefined;
  const itemToEdit = isEditing ? spots.find(s => s.id === id) : null;

  const [formData, setFormData] = useState<Omit<TourismSpot, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    type: 'Alam',
    description: '',
    image_url: '',
  });
  
  useEffect(() => {
    if (isEditing && itemToEdit) {
      const { id, created_at, updated_at, ...editableData } = itemToEdit;
      setFormData(editableData);
    }
  }, [id, isEditing, itemToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && itemToEdit) {
      await updateSpot({ ...formData, id: itemToEdit.id, created_at: itemToEdit.created_at, updated_at: itemToEdit.updated_at });
    } else {
      await addSpot(formData);
    }
    navigate('/admin/wisata');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Data Potensi & Wisata' : 'Tambah Data Baru'}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Potensi/Wisata</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
           <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Tipe</label>
            <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                <option>Alam</option>
                <option>Budaya</option>
                <option>UMKM</option>
            </select>
          </div>
           <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL Gambar</label>
            <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="https://picsum.photos/seed/..." />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/admin/wisata')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
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

export default TourismEditor;
