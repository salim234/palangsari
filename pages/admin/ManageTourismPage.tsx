import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { TourismContext } from '../../context/TourismContext';

const ManageTourismPage: React.FC = () => {
    const { spots, deleteSpot } = useContext(TourismContext);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            deleteSpot(id);
        }
    };

    return (
        <div>
            <AdminPageHeader title="Kelola Potensi & Wisata">
                <button
                    onClick={() => navigate('/admin/wisata/baru')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold text-sm shadow-sm transition-colors"
                >
                    Tambah Data Baru
                </button>
            </AdminPageHeader>

            <AdminContentCard>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Gambar</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Tipe</th>
                                <th className="py-3 px-6 text-right font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {spots.map(spot => (
                                <tr key={spot.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-6">
                                        <img src={spot.image_url} alt={spot.name} className="h-12 w-20 rounded-md object-cover"/>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">{spot.name}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{spot.type}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right font-medium">
                                        <button onClick={() => navigate(`/admin/wisata/edit/${spot.id}`)} className="text-emerald-600 hover:text-emerald-800 mr-4 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(spot.id)} className="text-red-600 hover:text-red-800 transition-colors">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminContentCard>
        </div>
    );
};

export default ManageTourismPage;
