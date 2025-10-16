import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsContext } from '../../context/NewsContext';
import { NewsArticle } from '../../types';

const NewsEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles, addArticle, updateArticle } = useContext(NewsContext);
  
  const isEditing = id !== undefined;
  const articleToEdit = isEditing ? articles.find(a => a.id === id) : null;

  const [formData, setFormData] = useState<Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    category: 'Sosial',
    published_date: new Date().toISOString().split('T')[0],
    image_url: '',
    excerpt: '',
    content: '',
  });
  
  useEffect(() => {
    if (isEditing && articleToEdit) {
      const { id, created_at, updated_at, ...editableData } = articleToEdit;
      setFormData(editableData);
    }
  }, [id, isEditing, articleToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && articleToEdit) {
      await updateArticle({ ...formData, id: articleToEdit.id, created_at: articleToEdit.created_at, updated_at: articleToEdit.updated_at });
    } else {
      await addArticle(formData);
    }
    navigate('/admin/berita');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Artikel Berita' : 'Tambah Artikel Baru'}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Artikel</label>
            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
           <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
            <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                <option>Sosial</option>
                <option>UMKM</option>
                <option>Pemerintahan</option>
                <option>Pendidikan</option>
                <option>Pariwisata</option>
            </select>
          </div>
           <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL Gambar</label>
            <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="https://picsum.photos/seed/..." />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Kutipan/Excerpt</label>
            <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Konten Lengkap (mendukung HTML)</label>
            <textarea name="content" id="content" rows={10} value={formData.content} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="<p>Tulis konten artikel di sini.</p>" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/admin/berita')} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              {isEditing ? 'Simpan Perubahan' : 'Publikasikan Artikel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsEditor;