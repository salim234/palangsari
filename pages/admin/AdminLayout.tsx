import React, { useState, useContext } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode; onClick?: () => void }> = ({ to, icon, children, onClick }) => {
    const activeClass = "bg-emerald-700 text-white";
    const inactiveClass = "text-gray-200 hover:bg-emerald-600 hover:text-white";
    return (
        <NavLink
            to={to}
            onClick={onClick}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive ? activeClass : inactiveClass}`
            }
        >
            {icon}
            <span className="ml-3">{children}</span>
        </NavLink>
    );
};

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };
    
    const closeSidebar = () => setSidebarOpen(false);

    const sidebarContent = (
        <div>
            <div className="flex items-center justify-center h-20 border-b border-emerald-700">
                <h1 className="text-2xl font-bold text-white">Admin Desa</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-2">
                 <SidebarLink to="/admin/dashboard" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}>
                    Dashboard
                </SidebarLink>
                <SidebarLink to="/admin/surat" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}>
                    Layanan Surat
                </SidebarLink>
                 <SidebarLink to="/admin/penduduk" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-3 5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                    Data Kependudukan
                </SidebarLink>
                <SidebarLink to="/admin/berita" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 4h2m-4 4h2m4-8h2m-4 8h2m-8 4h.01M12 3h.01M16 3h.01M20 3h.01M4 20h.01M4 16h.01M4 12h.01M4 8h.01" /></svg>}>
                    Kelola Berita
                </SidebarLink>
                <SidebarLink to="/admin/wisata" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}>
                    Potensi & Wisata
                </SidebarLink>
                 <SidebarLink to="/admin/data-desa" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}>
                    Data Desa
                </SidebarLink>
                <SidebarLink to="/admin/profil" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4" /></svg>}>
                    Kelola Profil
                </SidebarLink>
                 <SidebarLink to="/admin/perangkat" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}>
                    Perangkat Desa
                </SidebarLink>
                <SidebarLink to="/admin/lembaga" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-9.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12l5.354 2.975M23 12l-5.354 2.975M5.354 14.975L1 12m17.646 2.975L23 12" /></svg>}>
                    Lembaga Desa
                </SidebarLink>
                 <SidebarLink to="/admin/apbdes" onClick={closeSidebar} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}>
                    Data APBDes
                </SidebarLink>
            </nav>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-0 flex-1 bg-emerald-800">{sidebarContent}</div>
                </div>
            </div>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Header */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
                    <button onClick={() => setSidebarOpen(true)} className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 md:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <div className="flex-1 px-4 flex justify-end">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button onClick={handleLogout} className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800">
                                <span className="mr-2">Logout</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
            
            {/* Mobile sidebar */}
            {sidebarOpen && (
                 <div className="md:hidden">
                    <div className="fixed inset-0 flex z-40">
                        <div onClick={closeSidebar} className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-emerald-800">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button onClick={closeSidebar} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Close sidebar</span>
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            {sidebarContent}
                        </div>
                        <div className="flex-shrink-0 w-14"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;