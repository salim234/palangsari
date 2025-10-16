
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AdminPageHeader from './components/AdminPageHeader';
import { LetterContext } from '../../context/LetterContext';
import { NewsContext } from '../../context/NewsContext';
import { OfficialContext } from '../../context/OfficialContext';

const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode; linkTo: string; }> = ({ title, value, icon, linkTo }) => (
    <NavLink to={linkTo} className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 border border-gray-200/80 transition-all duration-300">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                {icon}
            </div>
        </div>
    </NavLink>
);


const DashboardPage: React.FC = () => {
    const { requests } = useContext(LetterContext);
    const { articles } = useContext(NewsContext);
    const { officials } = useContext(OfficialContext);

    const pendingRequests = requests.filter(r => r.status === 'Menunggu').length;

    return (
        <div>
            <AdminPageHeader title="Dashboard" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    title="Surat Menunggu" 
                    value={pendingRequests} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    linkTo="/admin/surat"
                />
                <StatCard 
                    title="Total Artikel Berita" 
                    value={articles.length} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 4h2m-4 4h2m4-8h2m-4 8h2m-8 4h.01M12 3h.01M16 3h.01M20 3h.01M4 20h.01M4 16h.01M4 12h.01M4 8h.01" /></svg>}
                    linkTo="/admin/berita"
                />
                <StatCard 
                    title="Jumlah Perangkat Desa" 
                    value={officials.length} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    linkTo="/admin/perangkat"
                />
            </div>

            {/* Quick Actions or recent activity could be added here */}
        </div>
    );
};

export default DashboardPage;
