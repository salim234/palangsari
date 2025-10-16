import React, { useContext } from 'react';
import { VillageContext } from '../context/VillageContext';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg mt-2 text-emerald-200">{subtitle}</p>
        </div>
    </div>
);

// FIX: Replaced JSX.Element with React.ReactNode to resolve namespace error.
const ContactInfoCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);

const ContactPage: React.FC = () => {
    const { villageProfile } = useContext(VillageContext);

    return (
        <div>
            <PageHeader title="Hubungi Kami" subtitle="Kami siap melayani dan menjawab pertanyaan Anda" />
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <ContactInfoCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                        title="Alamat Kantor Desa"
                    >
                        <p>{villageProfile.alamat_kantor}</p>
                    </ContactInfoCard>
                    <ContactInfoCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        title="Email & Telepon"
                    >
                        <p>{villageProfile.email}</p>
                        <p>Telp: {villageProfile.telepon}</p>
                    </ContactInfoCard>
                     <ContactInfoCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        title="Jam Pelayanan"
                    >
                        <p>Senin - Kamis: 08:00 - 15:00</p>
                        <p>Jumat: 08:00 - 11:00</p>
                    </ContactInfoCard>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-emerald-800 mb-6 text-center">Lokasi Kami di Peta</h2>
                    <div className="aspect-w-16 aspect-h-9">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.383820247657!2d112.84046707478028!3d-7.855018692161646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTEnNTguMSJTIDExMsKwNTAnMzMuNSJF!5e0!3m2!1sen!2sid!4v1718886915124!5m2!1sen!2sid" 
                            width="100%" 
                            height="450" 
                            style={{border:0}} 
                            allowFullScreen={true}
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="rounded-md">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
