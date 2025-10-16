import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { VillageContext } from '../context/VillageContext';

const Footer: React.FC = () => {
    const { villageProfile } = useContext(VillageContext);

    return (
        <footer className="bg-emerald-800 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Desa {villageProfile.nama_desa}</h3>
                        <p className="text-sm text-emerald-200">
                            Kecamatan {villageProfile.kecamatan}, Kabupaten {villageProfile.kabupaten}<br />
                            {villageProfile.provinsi}, Indonesia
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="text-emerald-200 hover:text-white transition-colors"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16.03 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg></a>
                            <a href="#" className="text-emerald-200 hover:text-white transition-colors"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" /></svg></a>
                            <a href="#" className="text-emerald-200 hover:text-white transition-colors"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Link Cepat</h3>
                        <ul className="space-y-2 text-sm">
                            <li><NavLink to="/profil" className="text-emerald-200 hover:text-white transition-colors">Sejarah Desa</NavLink></li>
                            <li><NavLink to="/pemerintahan" className="text-emerald-200 hover:text-white transition-colors">Struktur Pemerintahan</NavLink></li>
                            <li><NavLink to="/pelayanan" className="text-emerald-200 hover:text-white transition-colors">Pelayanan Online</NavLink></li>
                            <li><NavLink to="/berita" className="text-emerald-200 hover:text-white transition-colors">Berita Terkini</NavLink></li>
                            <li><NavLink to="/wisata" className="text-emerald-200 hover:text-white transition-colors">Potensi Wisata</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kontak Kami</h3>
                        <ul className="space-y-2 text-sm text-emerald-200">
                            <li>Kantor Desa {villageProfile.nama_desa}</li>
                            <li>{villageProfile.alamat_kantor}</li>
                            <li>Email: {villageProfile.email}</li>
                            <li>Telp: {villageProfile.telepon}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Lokasi Kantor Desa</h3>
                        <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.383820247657!2d112.84046707478028!3d-7.855018692161646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNTEnNTguMSJTIDExMsKwNTAnMzMuNSJF!5e0!3m2!1sen!2sid!4v1718886915124!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-emerald-700 text-center text-sm text-emerald-300">
                    <p>&copy; {new Date().getFullYear()} Pemerintah Desa {villageProfile.nama_desa}. All rights reserved.</p>
                    <p className="mt-2">
                        <NavLink to="/admin/login" className="text-emerald-400 hover:text-white transition-colors">
                            Admin Login
                        </NavLink>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;