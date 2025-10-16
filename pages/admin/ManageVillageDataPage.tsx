import React, { useContext, useState, useEffect } from 'react';
import { VillageContext } from '../../context/VillageContext';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { VillageProfile } from '../../types';

const ManageVillageDataPage: React.FC = () => {
    const { villageProfile, updateVillageProfile } = useContext(VillageContext);
    const [formData, setFormData] = useState<VillageProfile>(villageProfile);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        setFormData(villageProfile);
    }, [villageProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, updated_at, ...updateData } = formData;
        await updateVillageProfile(updateData);
        setNotification('Data desa berhasil diperbarui!');
        window.scrollTo(0, 0);
        setTimeout(() => setNotification(''), 3000);
    };
    
    const commonInputClass = "mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md";

    return (
        <div>
            <AdminPageHeader title="Kelola Data Desa" />
            <AdminContentCard>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {notification && (
                        <div className="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 p-4" role="alert">
                            <p>{notification}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="nama_desa" className="block text-sm font-medium text-gray-700">Nama Desa</label>
                            <input type="text" name="nama_desa" id="nama_desa" value={formData.nama_desa} onChange={handleChange} className={commonInputClass} />
                        </div>
                         <div>
                            <label htmlFor="kode_kemendagri" className="block text-sm font-medium text-gray-700">Kode Kemendagri</label>
                            <input type="text" name="kode_kemendagri" id="kode_kemendagri" value={formData.kode_kemendagri} onChange={handleChange} className={commonInputClass} />
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="kecamatan" className="block text-sm font-medium text-gray-700">Kecamatan</label>
                            <input type="text" name="kecamatan" id="kecamatan" value={formData.kecamatan} onChange={handleChange} className={commonInputClass} />
                        </div>
                         <div>
                            <label htmlFor="kabupaten" className="block text-sm font-medium text-gray-700">Kabupaten</label>
                            <input type="text" name="kabupaten" id="kabupaten" value={formData.kabupaten} onChange={handleChange} className={commonInputClass} />
                        </div>
                        <div>
                            <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">Provinsi</label>
                            <input type="text" name="provinsi" id="provinsi" value={formData.provinsi} onChange={handleChange} className={commonInputClass} />
                        </div>
                    </div>

                     <div>
                        <label htmlFor="alamat_kantor" className="block text-sm font-medium text-gray-700">Alamat Kantor Desa</label>
                        <input type="text" name="alamat_kantor" id="alamat_kantor" value={formData.alamat_kantor} onChange={handleChange} className={commonInputClass} />
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={commonInputClass} />
                        </div>
                         <div>
                            <label htmlFor="telepon" className="block text-sm font-medium text-gray-700">Telepon</label>
                            <input type="text" name="telepon" id="telepon" value={formData.telepon} onChange={handleChange} className={commonInputClass} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="kode_surat" className="block text-sm font-medium text-gray-700">Kode Surat Kecamatan</label>
                            <input type="text" name="kode_surat" id="kode_surat" value={formData.kode_surat} onChange={handleChange} className={commonInputClass} />
                        </div>
                        <div>
                            <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">URL Logo Desa</label>
                            <input type="text" name="logo_url" id="logo_url" value={formData.logo_url} onChange={handleChange} className={commonInputClass} />
                             {formData.logo_url && <img src={formData.logo_url} alt="Preview Logo" className="mt-2 h-20 w-auto rounded-sm object-cover" />}
                        </div>
                    </div>

                    <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                             <div>
                                <label htmlFor="nama_kepala_desa" className="block text-sm font-medium text-gray-700">Nama Kepala Desa</label>
                                <input type="text" name="nama_kepala_desa" id="nama_kepala_desa" value={formData.nama_kepala_desa} onChange={handleChange} className={commonInputClass} />
                            </div>
                        </div>
                         <div className="space-y-4">
                            <div>
                                <label htmlFor="nama_camat" className="block text-sm font-medium text-gray-700">Nama Camat</label>
                                <input type="text" name="nama_camat" id="nama_camat" value={formData.nama_camat} onChange={handleChange} className={commonInputClass} />
                            </div>
                             <div>
                                <label htmlFor="pangkat_camat" className="block text-sm font-medium text-gray-700">Pangkat Camat</label>
                                <input type="text" name="pangkat_camat" id="pangkat_camat" value={formData.pangkat_camat} onChange={handleChange} className={commonInputClass} />
                            </div>
                             <div>
                                <label htmlFor="nip_camat" className="block text-sm font-medium text-gray-700">NIP Camat</label>
                                <input type="text" name="nip_camat" id="nip_camat" value={formData.nip_camat} onChange={handleChange} className={commonInputClass} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-4 border-t">
                        <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </AdminContentCard>
        </div>
    );
};

export default ManageVillageDataPage;