import React, { useContext, useState } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { ProfileData } from '../../types';

const ManageProfilePage: React.FC = () => {
    const { profile, updateProfile } = useContext(ProfileContext);
    const [formData, setFormData] = useState<ProfileData>(profile);
    const [notification, setNotification] = useState('');

    // Update local form state when context data changes
    React.useEffect(() => {
        setFormData(profile);
    }, [profile]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDemografiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            demografi: {
                ...formData.demografi,
                [e.target.name]: e.target.name === 'luas_wilayah' ? e.target.value : Number(e.target.value),
            }
        });
    };
    
    const handleMisiChange = (index: number, value: string) => {
        const newMisi = [...formData.misi];
        newMisi[index] = value;
        setFormData({...formData, misi: newMisi});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, updated_at, ...updateData } = formData;
        await updateProfile(updateData);
        setNotification('Profil desa berhasil diperbarui!');
        setTimeout(() => setNotification(''), 3000);
    };

    return (
        <div>
            <AdminPageHeader title="Kelola Profil Desa" />
            <AdminContentCard>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {notification && (
                        <div className="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 p-4" role="alert">
                            <p>{notification}</p>
                        </div>
                    )}

                    <div>
                        <label htmlFor="sejarah" className="block text-sm font-medium text-gray-700">Sejarah (mendukung HTML)</label>
                        <textarea name="sejarah" id="sejarah" rows={6} value={formData.sejarah} onChange={handleTextChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    
                    <div>
                        <label htmlFor="visi" className="block text-sm font-medium text-gray-700">Visi</label>
                        <textarea name="visi" id="visi" rows={3} value={formData.visi} onChange={handleTextChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Misi</label>
                        {formData.misi.map((misi, index) => (
                            <input 
                                key={index}
                                type="text"
                                value={misi}
                                onChange={(e) => handleMisiChange(index, e.target.value)}
                                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        ))}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Demografi</label>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="luas_wilayah" value={formData.demografi.luas_wilayah} onChange={handleDemografiChange} placeholder="Luas Wilayah" className="shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            <input type="number" name="jumlah_penduduk" value={formData.demografi.jumlah_penduduk} onChange={handleDemografiChange} placeholder="Jumlah Penduduk" className="shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            <input type="number" name="pria" value={formData.demografi.pria} onChange={handleDemografiChange} placeholder="Laki-laki" className="shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            <input type="number" name="wanita" value={formData.demografi.wanita} onChange={handleDemografiChange} placeholder="Perempuan" className="shadow-sm sm:text-sm border-gray-300 rounded-md" />
                            <input type="number" name="jumlah_kk" value={formData.demografi.jumlah_kk} onChange={handleDemografiChange} placeholder="Jumlah KK" className="shadow-sm sm:text-sm border-gray-300 rounded-md" />
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </AdminContentCard>
        </div>
    );
};

export default ManageProfilePage;