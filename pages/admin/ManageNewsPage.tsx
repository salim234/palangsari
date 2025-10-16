import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { NewsContext } from '../../context/NewsContext';
import { NewsArticle } from '../../types';

const ManageNewsPage: React.FC = () => {
    const { articles, deleteArticle } = useContext(NewsContext);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
            deleteArticle(id);
        }
    };

    return (
        <div>
            <AdminPageHeader title="Kelola Berita">
                <button
                    onClick={() => navigate('/admin/berita/baru')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold text-sm shadow-sm transition-colors"
                >
                    Tambah Berita Baru
                </button>
            </AdminPageHeader>

            <AdminContentCard>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Judul</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                                <th className="py-3 px-6 text-right font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {articles.map((article: NewsArticle) => (
                                <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">{article.title}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{new Date(article.published_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right font-medium">
                                        <button onClick={() => navigate(`/admin/berita/edit/${article.id}`)} className="text-emerald-600 hover:text-emerald-800 mr-4 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800 transition-colors">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminContentCard>
        </div>
    );
};

export default ManageNewsPage;