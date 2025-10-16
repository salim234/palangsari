
import React, { useContext } from 'react';
import { TourismSpot } from '../types';
import { TourismContext } from '../context/TourismContext';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg mt-2 text-emerald-200">{subtitle}</p>
        </div>
    </div>
);

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-emerald-800">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
        </div>
    </section>
);

const TourismCard: React.FC<{ spot: TourismSpot }> = ({ spot }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
        <div className="relative">
            {/* FIX: Changed spot.imageUrl to spot.image_url to match the type definition. */}
            <img src={spot.image_url} alt={spot.name} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-sm font-bold px-3 py-1 m-2 rounded-full">{spot.type}</div>
        </div>
        <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{spot.name}</h3>
            <p className="text-gray-600 leading-relaxed">{spot.description}</p>
        </div>
    </div>
);

const TourismPage: React.FC = () => {
  const { spots } = useContext(TourismContext);
  return (
    <div>
        <PageHeader title="Potensi & Wisata" subtitle="Jelajahi Pesona Alam, Budaya, dan Produk Unggulan Desa Palangsari" />
        <div className="container mx-auto px-4 py-12">
            <Section title="Wisata Alam & Budaya">
                {spots.filter(s => s.type !== 'UMKM').map(spot => <TourismCard key={spot.id} spot={spot} />)}
            </Section>
            <Section title="Produk UMKM Unggulan">
                {spots.filter(s => s.type === 'UMKM').map(spot => <TourismCard key={spot.id} spot={spot} />)}
            </Section>
        </div>
    </div>
  );
};

export default TourismPage;