import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { OfficialContext } from '../../context/OfficialContext';

const ManageOfficialsPage: React.FC = () => {
    const { officials, deleteOfficial } = useContext(OfficialContext);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data perangkat desa ini?')) {
            deleteOfficial(id);
        }
    };

    return (
        <div>
            <AdminPageHeader title="Kelola Perangkat Desa">
                <button
                    onClick={() => navigate('/admin/perangkat/baru')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold text-sm shadow-sm transition-colors"
                >
                    Tambah Perangkat
                </button>
            </AdminPageHeader>

            <AdminContentCard>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Foto</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Jabatan</th>
                                <th className="py-3 px-6 text-right font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {officials.map(official => (
                                <tr key={official.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-6">
                                        <img src={official.image_url} alt={official.name} className="h-10 w-10 rounded-full object-cover"/>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">{official.name}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{official.position}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right font-medium">
                                        <button onClick={() => navigate(`/admin/perangkat/edit/${official.id}`)} className="text-emerald-600 hover:text-emerald-800 mr-4 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(official.id)} className="text-red-600 hover:text-red-800 transition-colors">Hapus</button>
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

export default ManageOfficialsPage;