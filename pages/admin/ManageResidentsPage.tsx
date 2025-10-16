import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { ResidentContext } from '../../context/ResidentContext';

const ManageResidentsPage: React.FC = () => {
    const { residents, deleteResident } = useContext(ResidentContext);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data penduduk ini?')) {
            deleteResident(id);
        }
    };

    return (
        <div>
            <AdminPageHeader title="Data Kependudukan">
                <button
                    onClick={() => navigate('/admin/penduduk/baru')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold text-sm shadow-sm transition-colors"
                >
                    Tambah Penduduk
                </button>
            </AdminPageHeader>

            <AdminContentCard>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">NIK</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">No. KK</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Alamat</th>
                                <th className="py-3 px-6 text-right font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {residents.map(resident => (
                                <tr key={resident.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">{resident.nik}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{resident.nama}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{resident.no_kk}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{resident.alamat}, RT {resident.rt}/RW {resident.rw}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right font-medium">
                                        <button onClick={() => navigate(`/admin/penduduk/edit/${resident.id}`)} className="text-emerald-600 hover:text-emerald-800 mr-4 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(resident.id)} className="text-red-600 hover:text-red-800 transition-colors">Hapus</button>
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

export default ManageResidentsPage;