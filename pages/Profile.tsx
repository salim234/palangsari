import React, { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg mt-2 text-emerald-200">{subtitle}</p>
        </div>
    </div>
);

const Section: React.FC<{ title: string, children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
    <section className={`bg-white p-8 rounded-xl shadow-md border border-gray-200/80 mb-8 ${className}`}>
        <h2 className="text-3xl font-bold mb-6 text-emerald-800">{title}</h2>
        {children}
    </section>
);

const DemografiItem: React.FC<{ label: string, value: string | number }> = ({ label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-emerald-700">{value}</p>
    </div>
);

const ProfilePage: React.FC = () => {
    const { profile } = useContext(ProfileContext);

    return (
        <div>
            <PageHeader title="Profil Desa Palangsari" subtitle="Mengenal Lebih Dekat Desa Kami" />
            <div className="container mx-auto px-4 py-12">
                <Section title="Sejarah Singkat">
                    <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: profile.sejarah }} />
                </Section>
                
                <Section title="Visi & Misi">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Visi</h3>
                        <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-600">
                            "{profile.visi}"
                        </blockquote>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Misi</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {profile.misi.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Section>

                <Section title="Data Demografi">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <DemografiItem label="Luas Wilayah" value={profile.demografi.luas_wilayah} />
                        <DemografiItem label="Jumlah Penduduk" value={profile.demografi.jumlah_penduduk} />
                        <DemografiItem label="Laki-laki" value={profile.demografi.pria} />
                        <DemografiItem label="Perempuan" value={profile.demografi.wanita} />
                        <DemografiItem label="Jumlah KK" value={profile.demografi.jumlah_kk} />
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default ProfilePage;