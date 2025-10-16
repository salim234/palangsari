import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NewsArticle } from '../types';
import { NewsContext } from '../context/NewsContext';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg mt-2 text-emerald-200">{subtitle}</p>
        </div>
    </div>
);

const NewsCard: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
    <img src={article.image_url} alt={article.title} className="w-full h-56 object-cover"/>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">{article.category}</span>
        <span className="text-xs text-gray-400">{new Date(article.published_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
      <h3 className="text-xl font-bold my-2 flex-grow">{article.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
      <NavLink to={`/berita/${article.id}`} className="text-emerald-600 font-semibold hover:text-emerald-800 transition self-start mt-auto">Baca Selengkapnya &rarr;</NavLink>
    </div>
  </div>
);

const NewsPage: React.FC = () => {
  const { articles } = useContext(NewsContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
        <PageHeader title="Berita & Kegiatan" subtitle="Informasi terkini dari Desa Palangsari" />
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentArticles.map(article => <NewsCard key={article.id} article={article} />)}
            </div>
            
            <div className="flex justify-center mt-12">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === number
                                    ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {number}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    </div>
  );
};

export default NewsPage;