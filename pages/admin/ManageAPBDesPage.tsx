import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { APBDesContext } from '../../context/APBDesContext';

const ManageAPBDesPage: React.FC = () => {
    const { data, deleteData } = useContext(APBDesContext);
    const navigate = useNavigate();

    const handleDelete = (year: number) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus data APBDes tahun ${year}?`)) {
            deleteData(year);
        }
    };

    return (
        <div>
            <AdminPageHeader title="Kelola Data APBDes">
                <button
                    onClick={() => navigate('/admin/apbdes/baru')}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold text-sm shadow-sm transition-colors"
                >
                    Tambah Data Tahunan
                </button>
            </AdminPageHeader>

            <AdminContentCard>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Tahun</th>
                                <th className="py-3 px-6 text-right font-semibold text-gray-600 uppercase tracking-wider">Total Pendapatan</th>
                                <th className="py-3 px-6 text-right font-semibold text-gray-600 uppercase tracking-wider">Total Belanja</th>
                                <th className="py-3 px-6 text-right font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data.map(item => (
                                <tr key={item.tahun} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">{item.tahun}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right text-gray-600">
                                        Rp {item.pendapatan.reduce((acc, p) => acc + p.anggaran, 0).toLocaleString('id-ID')}
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right text-gray-600">
                                        Rp {item.belanja.reduce((acc, b) => acc + b.anggaran, 0).toLocaleString('id-ID')}
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right font-medium">
                                        <button onClick={() => navigate(`/admin/apbdes/edit/${item.tahun}`)} className="text-emerald-600 hover:text-emerald-800 mr-4 transition-colors">Edit</button>
                                        <button onClick={() => handleDelete(item.tahun)} className="text-red-600 hover:text-red-800 transition-colors">Hapus</button>
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

export default ManageAPBDesPage;