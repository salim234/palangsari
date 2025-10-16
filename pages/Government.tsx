import React, { useContext } from 'react';
import { OfficialContext } from '../context/OfficialContext';
import { LembagaContext } from '../context/LembagaContext';
import { Official, LembagaDesa } from '../types';

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
        <h2 className="text-3xl font-bold text-center mb-10 text-emerald-800">{title}</h2>
        {children}
    </section>
);

const OfficialCard: React.FC<{ official: Official }> = ({ official }) => (
    <div className="text-center">
        <img 
            src={official.image_url} 
            alt={official.name} 
            className="w-40 h-40 mx-auto rounded-full object-cover mb-4 shadow-lg border-4 border-white" 
        />
        <h3 className="text-xl font-bold text-gray-800">{official.name}</h3>
        <p className="text-emerald-700 font-semibold">{official.position}</p>
    </div>
);

const LembagaCard: React.FC<{ lembaga: LembagaDesa }> = ({ lembaga }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200/80">
        <h3 className="text-xl font-bold text-emerald-800">{lembaga.nama} ({lembaga.singkatan})</h3>
        <p className="text-sm text-gray-500 mb-2">Ketua: {lembaga.ketua}</p>
        <p className="text-gray-700">{lembaga.deskripsi}</p>
    </div>
);

const GovernmentPage: React.FC = () => {
    const { officials } = useContext(OfficialContext);
    const { lembaga } = useContext(LembagaContext);

    return (
        <div className="bg-gray-50">
            <PageHeader title="Pemerintahan Desa" subtitle="Struktur Organisasi dan Lembaga Desa Palangsari" />
            <div className="container mx-auto px-4 py-16">
                <Section title="Struktur Perangkat Desa">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {officials.map(official => (
                            <OfficialCard key={official.id} official={official} />
                        ))}
                    </div>
                </Section>

                <Section title="Lembaga Kemasyarakatan Desa">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {lembaga.map(item => (
                            <LembagaCard key={item.id} lembaga={item} />
                        ))}
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default GovernmentPage;