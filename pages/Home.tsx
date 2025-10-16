import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NewsContext } from '../context/NewsContext';

const Hero: React.FC = () => (
  <div className="relative h-[60vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://cdn2.gnfi.net/gnfi/uploads/images/2024/08/whatsapp-image-2024-08-22-at-114819-pmjpeg')" }}>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Selamat Datang di Desa Palangsari</h1>
      <p className="text-lg md:text-xl max-w-3xl mb-8 animate-fade-in-up" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>"Mewujudkan Desa Palangsari yang Maju, Mandiri, Sejahtera, dan Berbudaya Berlandaskan Iman dan Taqwa."</p>
      <NavLink to="/pelayanan" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
        Ajukan Surat Online
      </NavLink>
    </div>
  </div>
);

const QuickLinkCard: React.FC<{ to: string, icon: React.ReactNode, title: string, description: string }> = ({ to, icon, title, description }) => (
    <NavLink to={to} className="group block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1.5 border border-gray-200/80 transition-all duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-4 mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-center text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-center text-sm">{description}</p>
    </NavLink>
);

const HomePage: React.FC = () => {
  const { articles } = useContext(NewsContext);
  const latestNews = articles.slice(0, 3);

  return (
    <div>
      <Hero />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-emerald-800">Sekilas Tentang Desa Palangsari</h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-8 leading-relaxed">
            Desa Palangsari adalah sebuah desa yang asri di Kecamatan Puspo, Kabupaten Pasuruan, dengan potensi alam yang luar biasa dan masyarakat yang ramah. Kami berkomitmen untuk memberikan pelayanan terbaik dan transparan bagi seluruh warga.
          </p>
          <NavLink to="/profil" className="font-semibold text-emerald-600 hover:text-emerald-800 transition-colors duration-300 group inline-block">
            Baca Selengkapnya <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
          </NavLink>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <QuickLinkCard 
                    to="/pelayanan" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    title="Pelayanan Online"
                    description="Ajukan surat keterangan dan layanan lainnya secara mudah dan cepat dari mana saja."
                />
                <QuickLinkCard 
                    to="/berita" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 4h2m-4 4h2m4-8h2m-4 8h2m-8 4h.01M12 3h.01M16 3h.01M20 3h.01M4 20h.01M4 16h.01M4 12h.01M4 8h.01" /></svg>}
                    title="Berita & Kegiatan"
                    description="Ikuti informasi terbaru seputar kegiatan, pengumuman, dan berita dari Desa Palangsari."
                />
                <QuickLinkCard 
                    to="/wisata" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                    title="Potensi & Wisata"
                    description="Jelajahi keindahan alam, kekayaan budaya, dan produk unggulan UMKM Desa Palangsari."
                />
            </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-800">Berita Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map(article => (
              <div key={article.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200/80 overflow-hidden transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover"/>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full self-start">{article.category}</span>
                  <h3 className="text-lg font-bold my-3 text-gray-800 flex-grow">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  <p className="text-xs text-gray-400 mb-4">{new Date(article.published_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                   <div className="mt-auto">
                    <NavLink to={`/berita/${article.id}`} className="font-semibold text-emerald-600 hover:text-emerald-800 transition-colors duration-300 group inline-block">
                      Baca Selengkapnya <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <NavLink to="/berita" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
              Lihat Semua Berita
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;