import React, { useContext, useState } from 'react';
import AdminPageHeader from './components/AdminPageHeader';
import AdminContentCard from './components/AdminContentCard';
import { LetterContext } from '../../context/LetterContext';
import { ResidentContext } from '../../context/ResidentContext';
import { LetterRequest, LetterStatus, Resident } from '../../types';
import LetterTemplate from './components/LetterTemplate';

const statusColors: { [key in LetterStatus]: string } = {
    Menunggu: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Diproses: 'bg-blue-100 text-blue-800 border-blue-300',
    Selesai: 'bg-green-100 text-green-800 border-green-300',
    Ditolak: 'bg-red-100 text-red-800 border-red-300',
};

const ManageLettersPage: React.FC = () => {
    const { requests, updateLetterStatus } = useContext(LetterContext);
    const { getResidentByNik } = useContext(ResidentContext);
    
    const [selectedRequestForDetail, setSelectedRequestForDetail] = useState<LetterRequest | null>(null);
    const [printData, setPrintData] = useState<{ request: LetterRequest; resident?: Resident } | null>(null);

    const handleStatusChange = (id: string, newStatus: LetterStatus) => {
        updateLetterStatus(id, newStatus);
    };

    const handlePrintClick = async (request: LetterRequest) => {
        const residentData = await getResidentByNik(request.requester_nik);
        setPrintData({ request, resident: residentData || undefined });
    };

    return (
        <div>
            {printData && <LetterTemplate data={printData} onClose={() => setPrintData(null)} />}
            
            <AdminPageHeader title="Layanan Surat" />
            <AdminContentCard>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Pemohon</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Jenis Surat</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="py-3 px-6 text-left font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requests.map((req: LetterRequest) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="font-medium text-gray-900">{req.residents?.nama || req.requester_nik}</div>
                                        <div className="text-xs text-gray-500 font-mono">{req.tracking_id}</div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{req.letter_type}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-600">{new Date(req.request_date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <select
                                            value={req.status}
                                            onChange={(e) => handleStatusChange(req.id, e.target.value as LetterStatus)}
                                            className={`w-32 px-3 py-1.5 text-xs font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500 transition-all ${statusColors[req.status]}`}
                                        >
                                            <option value="Menunggu">Menunggu</option>
                                            <option value="Diproses">Diproses</option>
                                            <option value="Selesai">Selesai</option>
                                            <option value="Ditolak">Ditolak</option>
                                        </select>
                                    </td>
                                     <td className="py-4 px-6 whitespace-nowrap font-medium space-x-4">
                                        <button onClick={() => setSelectedRequestForDetail(req)} className="text-emerald-600 hover:text-emerald-800">
                                            Lihat Detail
                                        </button>
                                         <button onClick={() => handlePrintClick(req)} className="text-blue-600 hover:text-blue-800">
                                            Cetak Surat
                                        </button>
                                     </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </AdminContentCard>

             {selectedRequestForDetail && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
                        <h3 className="text-lg font-bold mb-4">Detail Permohonan</h3>
                        <div className="text-sm space-y-2">
                            <p><strong>ID:</strong> {selectedRequestForDetail.tracking_id}</p>
                            <p><strong>Nama:</strong> {selectedRequestForDetail.residents?.nama}</p>
                            <p><strong>NIK:</strong> {selectedRequestForDetail.requester_nik}</p>
                            <p><strong>Jenis Surat:</strong> {selectedRequestForDetail.letter_type}</p>
                            <p><strong>Tanggal:</strong> {new Date(selectedRequestForDetail.request_date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                            <p><strong>Status:</strong> {selectedRequestForDetail.status}</p>
                            <p><strong>Catatan:</strong> {selectedRequestForDetail.notes || '-'}</p>
                             {selectedRequestForDetail.details && Object.keys(selectedRequestForDetail.details).length > 0 && (
                                <div className="border-t pt-2 mt-2">
                                    <h4 className="font-semibold">Informasi Tambahan:</h4>
                                    {Object.entries(selectedRequestForDetail.details).map(([key, value]) => (
                                        <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mt-6 text-right">
                            <button onClick={() => setSelectedRequestForDetail(null)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Tutup</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageLettersPage;