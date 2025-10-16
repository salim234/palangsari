
import React, { Suspense, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AppProviders from './components/Providers';
import FullPageLoader from './components/FullPageLoader';
import { VillageContext } from './context/VillageContext';

// Lazy load all page components for code-splitting
const HomePage = React.lazy(() => import('./pages/Home'));
const ProfilePage = React.lazy(() => import('./pages/Profile'));
const GovernmentPage = React.lazy(() => import('./pages/Government'));
const ServicesPage = React.lazy(() => import('./pages/Services'));
const NewsPage = React.lazy(() => import('./pages/News'));
const NewsDetailPage = React.lazy(() => import('./pages/NewsDetail'));
const TourismPage = React.lazy(() => import('./pages/Tourism'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const Chatbot = React.lazy(() => import('./components/Chatbot'));

// Lazy load admin pages
const LoginPage = React.lazy(() => import('./pages/admin/LoginPage'));
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));
const DashboardPage = React.lazy(() => import('./pages/admin/DashboardPage'));
const ManageLettersPage = React.lazy(() => import('./pages/admin/ManageLettersPage'));
const ManageResidentsPage = React.lazy(() => import('./pages/admin/ManageResidentsPage'));
const ResidentEditor = React.lazy(() => import('./pages/admin/ResidentEditor'));
const ManageNewsPage = React.lazy(() => import('./pages/admin/ManageNewsPage'));
const NewsEditor = React.lazy(() => import('./pages/admin/NewsEditor'));
const ManageVillageDataPage = React.lazy(() => import('./pages/admin/ManageVillageDataPage'));
const ManageProfilePage = React.lazy(() => import('./pages/admin/ManageProfilePage'));
const ManageOfficialsPage = React.lazy(() => import('./pages/admin/ManageOfficialsPage'));
const OfficialEditor = React.lazy(() => import('./pages/admin/OfficialEditor'));
const ManageLembagaPage = React.lazy(() => import('./pages/admin/ManageLembagaPage'));
const LembagaEditor = React.lazy(() => import('./pages/admin/LembagaEditor'));
const ManageAPBDesPage = React.lazy(() => import('./pages/admin/ManageAPBDesPage'));
const APBDesEditor = React.lazy(() => import('./pages/admin/APBDesEditor'));
const ManageTourismPage = React.lazy(() => import('./pages/admin/ManageTourismPage'));
const TourismEditor = React.lazy(() => import('./pages/admin/TourismEditor'));


// This component updates the page title and favicon dynamically.
// It must be rendered within the VillageProvider to access its context.
const DynamicHeadUpdater: React.FC = () => {
  const { villageProfile } = useContext(VillageContext);

  useEffect(() => {
    // Check if profile has loaded by verifying a non-default, essential value
    if (villageProfile && villageProfile.nama_desa) {
      document.title = `Website Desa ${villageProfile.nama_desa}`;
      const favicon = document.getElementById('favicon') as HTMLLinkElement;
      if (favicon && villageProfile.logo_url) {
        favicon.href = villageProfile.logo_url;
      }
    }
  }, [villageProfile]);

  return null; // This component does not render anything to the DOM
};


const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
};

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <DynamicHeadUpdater />
            <PageLayout>
                <Suspense fallback={<FullPageLoader />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profil" element={<ProfilePage />} />
                        <Route path="/pemerintahan" element={<GovernmentPage />} />
                        <Route path="/pelayanan" element={<ServicesPage />} />
                        <Route path="/berita" element={<NewsPage />} />
                        <Route path="/berita/:id" element={<NewsDetailPage />} />
                        <Route path="/wisata" element={<TourismPage />} />
                        <Route path="/kontak" element={<ContactPage />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<LoginPage />} />
                        <Route 
                            path="/admin" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route path="dashboard" element={<DashboardPage />} />
                            <Route path="surat" element={<ManageLettersPage />} />
                            
                            <Route path="penduduk" element={<ManageResidentsPage />} />
                            <Route path="penduduk/baru" element={<ResidentEditor />} />
                            <Route path="penduduk/edit/:id" element={<ResidentEditor />} />

                            <Route path="berita" element={<ManageNewsPage />} />
                            <Route path="berita/baru" element={<NewsEditor />} />
                            <Route path="berita/edit/:id" element={<NewsEditor />} />

                            <Route path="data-desa" element={<ManageVillageDataPage />} />
                            <Route path="profil" element={<ManageProfilePage />} />

                            <Route path="perangkat" element={<ManageOfficialsPage />} />
                            <Route path="perangkat/baru" element={<OfficialEditor />} />
                            <Route path="perangkat/edit/:id" element={<OfficialEditor />} />

                            <Route path="lembaga" element={<ManageLembagaPage />} />
                            <Route path="lembaga/baru" element={<LembagaEditor />} />
                            <Route path="lembaga/edit/:id" element={<LembagaEditor />} />
                            
                            <Route path="apbdes" element={<ManageAPBDesPage />} />
                            <Route path="apbdes/baru" element={<APBDesEditor />} />
                            <Route path="apbdes/edit/:year" element={<APBDesEditor />} />

                            <Route path="wisata" element={<ManageTourismPage />} />
                            <Route path="wisata/baru" element={<TourismEditor />} />
                            <Route path="wisata/edit/:id" element={<TourismEditor />} />

                            <Route index element={<DashboardPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </PageLayout>
        </Router>
    );
};

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};

export default App;