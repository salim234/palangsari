import React, { useState, useContext, useEffect } from 'react';
import { LetterContext } from '../context/LetterContext';
import { ResidentContext } from '../context/ResidentContext';
import { LetterRequest, Resident } from '../types';
import { letterCategories, LetterFormField } from '../data/letterTypesData';

const PageHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg mt-2 text-emerald-200">{subtitle}</p>
        </div>
    </div>
);

const StatusBadge: React.FC<{ status: LetterRequest['status'] }> = ({ status }) => {
    const statusColors: { [key in LetterRequest['status']]: string } = {
        'Menunggu': 'bg-yellow-100 text-yellow-800',
        'Diproses': 'bg-blue-100 text-blue-800',
        'Selesai': 'bg-green-100 text-green-800',
        'Ditolak': 'bg-red-100 text-red-800',
    };
    return (
        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[status]}`}>
            {status}
        </span>
    );
};

const NewResidentForm: React.FC<{ nik: string; formData: Omit<Resident, 'id' | 'created_at' | 'updated_at'>; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void; }> = ({ nik, formData, onChange }) => {
    const commonInputClass = "mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500";
    
    return (
        <div className="space-y-4 border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Data Anda tidak ditemukan. Silakan lengkapi data kependudukan Anda.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="nik" className="block text-sm font-medium text-gray-700">NIK</label>
                    <input type="text" name="nik" id="nik" value={nik} readOnly disabled className={`${commonInputClass} bg-gray-100`} />
                </div>
                <div>
                    <label htmlFor="no_kk" className="block text-sm font-medium text-gray-700">No. Kartu Keluarga</label>
                    <input type="text" name="no_kk" id="no_kk" value={formData.no_kk} onChange={onChange} required maxLength={16} className={commonInputClass} />
                </div>
            </div>

            <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input type="text" name="nama" id="nama" value={formData.nama} onChange={onChange} required className={commonInputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="tempat_lahir" className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                    <input type="text" name="tempat_lahir" id="tempat_lahir" value={formData.tempat_lahir} onChange={onChange} required className={commonInputClass} />
                </div>
                <div>
                    <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                    <input type="date" name="tanggal_lahir" id="tanggal_lahir" value={formData.tanggal_lahir} onChange={onChange} required className={commonInputClass} />
                </div>
            </div>

             <div>
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">Alamat</label>
                <textarea name="alamat" id="alamat" rows={2} value={formData.alamat} onChange={onChange} required className={commonInputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="rt" className="block text-sm font-medium text-gray-700">RT</label>
                    <input type="text" name="rt" id="rt" value={formData.rt} onChange={onChange} required className={commonInputClass} />
                </div>
                 <div>
                    <label htmlFor="rw" className="block text-sm font-medium text-gray-700">RW</label>
                    <input type="text" name="rw" id="rw" value={formData.rw} onChange={onChange} required className={commonInputClass} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                    <select name="jenis_kelamin" id="jenis_kelamin" value={formData.jenis_kelamin} onChange={onChange} className={commonInputClass}>
                        <option>Laki-laki</option>
                        <option>Perempuan</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="agama" className="block text-sm font-medium text-gray-700">Agama</label>
                     <select name="agama" id="agama" value={formData.agama} onChange={onChange} className={commonInputClass}>
                        <option>Islam</option>
                        <option>Kristen</option>
                        <option>Katolik</option>
                        <option>Hindu</option>
                        <option>Budha</option>
                        <option>Khonghucu</option>
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="status_perkawinan" className="block text-sm font-medium text-gray-700">Status Perkawinan</label>
                    <select name="status_perkawinan" id="status_perkawinan" value={formData.status_perkawinan} onChange={onChange} className={commonInputClass}>
                        <option>Belum Kawin</option>
                        <option>Kawin</option>
                        <option>Cerai Hidup</option>
                        <option>Cerai Mati</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="pekerjaan" className="block text-sm font-medium text-gray-700">Pekerjaan</label>
                    <input type="text" name="pekerjaan" id="pekerjaan" value={formData.pekerjaan} onChange={onChange} required className={commonInputClass} />
                </div>
            </div>
        </div>
    );
};


const LetterTracker: React.FC = () => {
    const { requests } = useContext(LetterContext);
    const [trackingId, setTrackingId] = useState('');
    const [searchResult, setSearchResult] = useState<LetterRequest | null | undefined>(undefined);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const found = requests.find(r => r.tracking_id.toLowerCase() === trackingId.toLowerCase());
        setSearchResult(found || null);
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200/80 mt-12">
            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">Lacak Status Pengajuan Surat</h2>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Masukkan ID Pelacakan Anda..."
                    className="flex-grow w-full px-4 py-2 shadow-sm sm:text-sm border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-sm hover:shadow-md">
                    Lacak
                </button>
            </form>
            {searchResult === null && (
                <div className="text-center bg-red-50 p-4 rounded-md text-red-700">
                    ID Pelacakan tidak ditemukan. Mohon periksa kembali.
                </div>
            )}
            {searchResult && (
                 <div className="bg-gray-50 p-6 rounded-lg border">
                    <h3 className="font-bold text-lg mb-4">Hasil Pelacakan</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">ID Pelacakan:</span> <span className="font-medium font-mono">{searchResult.tracking_id}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Nama Pemohon:</span> <span className="font-medium">{searchResult.residents?.nama || searchResult.requester_nik}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Jenis Surat:</span> <span className="font-medium">{searchResult.letter_type}</span></div>
                        <div className="flex justify-between items-center"><span className="text-gray-500">Status:</span> <StatusBadge status={searchResult.status} /></div>
                    </div>
                </div>
            )}
        </div>
    );
};

const ServicesPage: React.FC = () => {
    const { addLetterRequest } = useContext(LetterContext);
    const { getResidentByNik, addResident } = useContext(ResidentContext);
    
    // Form state
    const [nikInput, setNikInput] = useState('');
    const [isNikChecked, setIsNikChecked] = useState(false);
    const [foundResident, setFoundResident] = useState<Resident | null>(null);
    const [showNewResidentForm, setShowNewResidentForm] = useState(false);
    const [letterType, setLetterType] = useState(letterCategories[0]?.options[0]?.name || '');
    const [letterDetails, setLetterDetails] = useState<Record<string, string | number>>({});
    const [notes, setNotes] = useState('');
    const [newResidentData, setNewResidentData] = useState<Omit<Resident, 'id' | 'created_at' | 'updated_at'>>({
        nik: '', no_kk: '', nama: '', tempat_lahir: '', tanggal_lahir: '', jenis_kelamin: 'Laki-laki', alamat: '', rt: '', rw: '', agama: 'Islam', status_perkawinan: 'Belum Kawin', pekerjaan: '', kewarganegaraan: 'WNI',
    });

    // Submission state
    const [isLoading, setIsLoading] = useState(false);
    const [submittedTrackingId, setSubmittedTrackingId] = useState<string | null>(null);
    const [error, setError] = useState('');

    const allLetterOptions = letterCategories.flatMap(c => c.options);
    const selectedLetterOption = allLetterOptions.find(o => o.name === letterType);

    useEffect(() => {
        setLetterDetails({});
    }, [letterType]);

    const handleNikCheck = async () => {
        setError('');
        if (!/^\d{16}$/.test(nikInput)) {
            setError('NIK harus terdiri dari 16 digit angka.');
            return;
        }
        setIsLoading(true);
        const resident = await getResidentByNik(nikInput);
        setIsLoading(false);
        setIsNikChecked(true);
        if (resident) {
            setFoundResident(resident);
            setShowNewResidentForm(false);
        } else {
            setFoundResident(null);
            setShowNewResidentForm(true);
            setNewResidentData(prev => ({ ...prev, nik: nikInput }));
        }
    };
    
    const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setLetterDetails(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    };
    
    const handleNewResidentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewResidentData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        let requesterNik = '';

        if (showNewResidentForm) {
            if (!/^\d{16}$/.test(newResidentData.no_kk)) {
                setError('Nomor KK harus terdiri dari 16 digit angka.');
                return;
            }
            if(Object.values(newResidentData).some(val => val === '')) {
                 setError('Semua field data kependudukan wajib diisi.');
                 return;
            }
            setIsLoading(true);
            const newResident = await addResident(newResidentData);
            setIsLoading(false);
            if (!newResident) {
                setError('Gagal menyimpan data penduduk baru. Coba lagi.');
                return;
            }
            requesterNik = newResident.nik;
        } else if (foundResident) {
            requesterNik = foundResident.nik;
        } else {
             setError('Silakan cek NIK Anda terlebih dahulu.');
             return;
        }

        for (const field of selectedLetterOption?.fields || []) {
            if (field.required && !letterDetails[field.name]) {
                setError(`Kolom "${field.label}" wajib diisi.`);
                return;
            }
        }
        
        setIsLoading(true);
        const newTrackingId = await addLetterRequest({
            requester_nik: requesterNik,
            letter_type: letterType,
            details: letterDetails,
            notes,
            request_date: new Date().toISOString().split('T')[0],
        });
        setIsLoading(false);

        if (newTrackingId) {
            setSubmittedTrackingId(newTrackingId);
            // Reset form
            setNikInput('');
            setIsNikChecked(false);
            setFoundResident(null);
            setShowNewResidentForm(false);
            setLetterType(letterCategories[0]?.options[0]?.name || '');
            setLetterDetails({});
            setNotes('');
            setNewResidentData({ nik: '', no_kk: '', nama: '', tempat_lahir: '', tanggal_lahir: '', jenis_kelamin: 'Laki-laki', alamat: '', rt: '', rw: '', agama: 'Islam', status_perkawinan: 'Belum Kawin', pekerjaan: '', kewarganegaraan: 'WNI' });
        } else {
            setError('Gagal mengirim permohonan surat. Silakan coba lagi nanti.');
        }
    };
    
    const renderDynamicField = (field: LetterFormField) => {
        const commonProps = {
            name: field.name,
            id: field.name,
            value: letterDetails[field.name] || '',
            onChange: handleDetailChange,
            required: field.required,
            placeholder: field.placeholder || '',
            className: "mt-1 block w-full px-4 py-2 shadow-sm sm:text-sm border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
        };
        
        return (
            <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
                {field.type === 'textarea' ? (
                    <textarea {...commonProps} rows={3}></textarea>
                ) : (
                    <input type={field.type} {...commonProps} />
                )}
            </div>
        );
    };

    return (
        <div>
            <PageHeader title="Pelayanan Online" subtitle="Ajukan surat keterangan dengan mudah dan cepat" />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200/80">
                    {submittedTrackingId ? (
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-500 mx-auto mb-4" fill="none" viewBox="0 0 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Permohonan Terkirim!</h2>
                            <p className="text-gray-600 mb-4">Permohonan Anda telah berhasil kami terima. Simpan ID Pelacakan Anda untuk memeriksa status permohonan.</p>
                             <div className="bg-emerald-50 border-2 border-dashed border-emerald-300 text-emerald-800 font-mono text-xl p-4 rounded-lg mb-6">
                                {submittedTrackingId}
                            </div>
                            <button onClick={() => setSubmittedTrackingId(null)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                                Ajukan Surat Lain
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">Formulir Pengajuan Surat</h2>
                            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">{error}</div>}
                            
                            <div>
                                <label htmlFor="nik" className="block text-sm font-medium text-gray-700">Nomor Induk Kependudukan (NIK)</label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input type="text" name="nik" id="nik" value={nikInput} onChange={(e) => setNikInput(e.target.value)} required maxLength={16} className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 focus:ring-emerald-500 focus:border-emerald-500" disabled={isNikChecked || isLoading} />
                                    <button type="button" onClick={handleNikCheck} disabled={isNikChecked || isLoading} className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-r-md disabled:bg-gray-200 disabled:cursor-not-allowed">
                                        {isLoading ? 'Mengecek...' : 'Cek NIK'}
                                    </button>
                                </div>
                                {isNikChecked && (
                                     <button type="button" onClick={() => { setIsNikChecked(false); setNikInput(''); setFoundResident(null); setShowNewResidentForm(false); }} className="text-xs text-emerald-600 hover:underline mt-1">Ubah NIK</button>
                                )}
                            </div>

                            {isNikChecked && (
                                <>
                                    {showNewResidentForm && <NewResidentForm nik={nikInput} formData={newResidentData} onChange={handleNewResidentChange} />}
                                    
                                    {foundResident && (
                                         <div>
                                            <label htmlFor="requesterName" className="block text-sm font-medium text-gray-700">Nama Lengkap (sesuai KTP)</label>
                                            <input type="text" name="requesterName" id="requesterName" value={foundResident.nama} disabled readOnly className="mt-1 block w-full px-4 py-2 shadow-sm sm:text-sm border-gray-300 rounded-lg bg-gray-100" />
                                            <p className="mt-1 text-xs text-green-600">Data ditemukan. Silakan lanjutkan pengajuan.</p>
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="letter_type" className="block text-sm font-medium text-gray-700">Jenis Surat yang Diajukan</label>
                                        <select name="letter_type" id="letter_type" value={letterType} onChange={(e) => setLetterType(e.target.value)} className="mt-1 block w-full px-4 py-2 shadow-sm sm:text-sm border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                                            {letterCategories.map(category => (
                                                <optgroup key={category.codePrefix} label={`- ${category.category} -`}>
                                                    {category.options.map(option => (
                                                        <option key={option.code} value={option.name}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                         {selectedLetterOption && (
                                            <p className="mt-2 text-xs text-gray-500">
                                                <strong>Kegunaan:</strong> {selectedLetterOption.description}
                                            </p>
                                        )}
                                    </div>
                                    
                                    {selectedLetterOption && selectedLetterOption.fields.length > 0 && (
                                        <div className="space-y-4 border-t pt-6">
                                            <h3 className="text-md font-semibold text-gray-700">Data Tambahan Diperlukan</h3>
                                            {selectedLetterOption.fields.map(renderDynamicField)}
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Keperluan / Catatan Tambahan (opsional)</label>
                                        <textarea name="notes" id="notes" rows={4} value={notes} onChange={e => setNotes(e.target.value)} className="mt-1 block w-full px-4 py-2 shadow-sm sm:text-sm border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="Contoh: Untuk pengajuan pinjaman bank..."></textarea>
                                    </div>

                                     <div className="pt-4">
                                        <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-300 shadow-md hover:shadow-lg disabled:bg-emerald-400 disabled:cursor-wait">
                                            {isLoading ? 'Memproses...' : 'Kirim Permohonan'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    )}
                </div>
                <LetterTracker />
            </div>
        </div>
    );
};

export default ServicesPage;