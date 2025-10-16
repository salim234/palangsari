import React, { useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext';

const PageHeader: React.FC<{ title: string, subtitle?: string }> = ({ title, subtitle }) => (
    <div className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            {subtitle && <p className="text-lg mt-2 text-emerald-200">{subtitle}</p>}
        </div>
    </div>
);

const NewsDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { articles } = useContext(NewsContext);
    const article = articles.find(a => a.id === id);

    if (!article) {
        return (
            <div>
                <PageHeader title="Artikel Tidak Ditemukan" />
                <div className="container mx-auto px-4 py-12 text-center">
                    <p className="text-xl text-gray-600 mb-8">Maaf, berita yang Anda cari tidak dapat ditemukan.</p>
                    <NavLink to="/berita" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                        Kembali ke Halaman Berita
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url('${article.image_url}')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="container mx-auto px-4 -mt-24 relative pb-16">
                <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
                    <div className="mb-6">
                        <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full font-semibold">{article.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{article.title}</h1>
                    <p className="text-gray-500 text-sm mb-8">Dipublikasikan pada {new Date(article.published_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    
                    <div 
                        className="prose max-w-none text-gray-700 leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                    
                    <div className="mt-12 pt-6 border-t border-gray-200">
                         <NavLink to="/berita" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-800 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>
                            Kembali ke Semua Berita
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;