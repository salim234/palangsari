import React, { useContext, useState } from 'react';
import { LetterRequest, Resident } from '../../../types';
import { generateLetterContent } from '../../../lib/letterContentGenerator';
import { VillageContext } from '../../../context/VillageContext';
import { letterCategories } from '../../../data/letterTypesData';

interface LetterTemplateProps {
    data: {
        request: LetterRequest;
        resident?: Resident;
    };
    onClose: () => void;
}

const getLetterCodePrefix = (letterName: string): string => {
    for (const category of letterCategories) {
        for (const option of category.options) {
            if (option.name === letterName) {
                return category.codePrefix;
            }
        }
    }
    return "474"; // Default fallback
}


const LetterTemplate: React.FC<LetterTemplateProps> = ({ data, onClose }) => {
    const { villageProfile } = useContext(VillageContext);
    const { request, resident } = data;
    const [includeCamat, setIncludeCamat] = useState(true);
    
    const handlePrint = () => {
        window.print();
    };

    const today = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const letterCodePrefix = getLetterCodePrefix(request.letter_type);
    const letterNumber = `${letterCodePrefix}/${String(request.id.substring(0,3)).toUpperCase()}/${villageProfile.kode_surat}/${new Date().getFullYear()}`;


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-4 border w-full max-w-4xl shadow-lg rounded-xl bg-white">
                <div className="p-4 bg-gray-100 rounded-t-lg flex justify-between items-center no-print">
                     <h3 className="text-xl font-bold text-gray-800">Pratinjau Surat</h3>
                     <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="includeCamat"
                                checked={includeCamat}
                                onChange={(e) => setIncludeCamat(e.target.checked)}
                                className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                            />
                            <label htmlFor="includeCamat" className="text-sm font-medium text-gray-700">
                                Sertakan Tanda Tangan Camat
                            </label>
                        </div>
                         <div>
                            <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold mr-2">
                                Tutup
                            </button>
                             <button onClick={handlePrint} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold">
                                Cetak
                            </button>
                        </div>
                    </div>
                </div>

                {/* A4-like container */}
                <div id="print-area" className="bg-white p-12 mx-auto" style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Times New Roman', Times, serif" }}>
                    {/* Kop Surat */}
                    <header>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                            <img src={villageProfile.logo_url} alt="Logo" style={{ width: '80px', height: 'auto' }} />
                            <div style={{ textAlign: 'center', lineHeight: '1.3' }}>
                                <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>PEMERINTAH KABUPATEN {villageProfile.kabupaten.toUpperCase()}</div>
                                <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>KECAMATAN {villageProfile.kecamatan.toUpperCase()}</div>
                                <div style={{ fontSize: '18pt', fontWeight: 'bold' }}>KANTOR DESA {villageProfile.nama_desa.toUpperCase()}</div>
                                <div style={{ fontSize: '10pt' }}>{villageProfile.alamat_kantor}</div>
                            </div>
                        </div>
                        <div style={{ borderBottom: '3px solid black', marginTop: '10px' }}></div>
                        <div style={{ borderBottom: '1px solid black', marginTop: '2px' }}></div>
                    </header>
                    
                    {/* Letter Head */}
                    <section style={{ textAlign: 'center', marginTop: '30px' }}>
                        <h3 style={{ textDecoration: 'underline', margin: 0, fontSize: '14pt', fontWeight: 'bold' }}>
                           {request.letter_type.toUpperCase().replace(/\s*\(.*\)\s*/, '')}
                        </h3>
                        <p style={{ margin: '5px 0 0 0', fontSize: '12pt' }}>Nomor : {letterNumber}</p>
                    </section>

                    {/* Letter Body */}
                    <section style={{ marginTop: '40px', fontSize: '12pt' }}>
                       {generateLetterContent(request, villageProfile, resident)}
                    </section>

                    {/* Signature */}
                    <section style={{ marginTop: '60px', fontSize: '12pt', display: 'flex', justifyContent: includeCamat ? 'space-between' : 'flex-end' }}>
                        {includeCamat && (
                            <div style={{ textAlign: 'center', width: '45%' }}>
                                <p>Mengetahui,</p>
                                <p>Camat {villageProfile.kecamatan}</p>
                                <div style={{ height: '80px' }}></div>
                                <div style={{ fontWeight: 'bold' }}>
                                    <p style={{ textDecoration: 'underline', margin: 0 }}>{villageProfile.nama_camat.toUpperCase()}</p>
                                    <p style={{ margin: 0 }}>{villageProfile.pangkat_camat}</p>
                                    <p style={{ margin: 0 }}>NIP. {villageProfile.nip_camat}</p>
                                </div>
                            </div>
                        )}
                        <div style={{ textAlign: 'center', width: '45%' }}>
                            <p>{villageProfile.nama_desa}, {today}</p>
                            <p>Kepala Desa {villageProfile.nama_desa}</p>
                            <div style={{ height: '80px' }}></div>
                            <p style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{villageProfile.nama_kepala_desa.toUpperCase()}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LetterTemplate;