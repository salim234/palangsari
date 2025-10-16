import React from 'react';
import { LetterRequest, Resident, VillageProfile } from '../types';

const DataRow: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
    <tr>
        <td style={{ padding: '2px 10px 2px 40px', verticalAlign: 'top', width: '200px' }}>{label}</td>
        <td style={{ verticalAlign: 'top', width: '10px' }}>:</td>
        <td style={{ verticalAlign: 'top' }}><strong>{value || '-'}</strong></td>
    </tr>
);

const formatDate = (dateString: string) => {
     if (!dateString) return '-';
    // Add timezone 'Z' to prevent date shifting
    const date = new Date(dateString + 'T00:00:00Z');
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
    });
};

export const generateLetterContent = (request: LetterRequest, villageProfile: VillageProfile, resident?: Resident): React.ReactNode => {
    const commonData = [
        { label: 'Nama Lengkap', value: resident?.nama || request.requester_nik },
        { label: 'NIK', value: resident?.nik },
        { label: 'Tempat/Tgl. Lahir', value: resident ? `${resident.tempat_lahir}, ${formatDate(resident.tanggal_lahir)}` : '-' },
        { label: 'Jenis Kelamin', value: resident?.jenis_kelamin },
        { label: 'Agama', value: resident?.agama },
        { label: 'Status Perkawinan', value: resident?.status_perkawinan },
        { label: 'Pekerjaan', value: resident?.pekerjaan },
        { label: 'Alamat', value: resident ? `${resident.alamat}, RT ${resident.rt}/RW ${resident.rw}, Desa ${villageProfile.nama_desa}` : '-' },
    ];

    let specificContent;
    let openingParagraph = `Yang bertanda tangan di bawah ini Kepala Desa ${villageProfile.nama_desa}, Kecamatan ${villageProfile.kecamatan}, Kabupaten ${villageProfile.kabupaten}, menerangkan dengan sebenarnya bahwa:`;
    let closingParagraph = `Demikian Surat Keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.`;
    
    switch (request.letter_type) {
        case "Surat Keterangan Usaha (SKU)":
            specificContent = (
                <>
                    <p>Berdasarkan pengamatan kami dan data yang ada, nama tersebut di atas adalah benar penduduk Desa {villageProfile.nama_desa} dan memiliki usaha sebagai berikut:</p>
                    <table>
                        <tbody>
                            <DataRow label="Nama Usaha" value={request.details?.namaUsaha} />
                            <DataRow label="Jenis Usaha" value={request.details?.jenisUsaha} />
                            <DataRow label="Alamat Usaha" value={request.details?.alamatUsaha} />
                        </tbody>
                    </table>
                </>
            );
            break;
            
        case "Surat Keterangan Tidak Mampu (SKTM)":
            closingParagraph = `Surat Keterangan ini dibuat untuk keperluan <strong>${request.details?.keperluanSktm || '-'}</strong>. Demikian Surat Keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.`
            specificContent = <p>Berdasarkan data yang ada pada kami, nama tersebut di atas adalah benar penduduk Desa {villageProfile.nama_desa} dan tergolong dalam keluarga kurang mampu.</p>;
            break;

        case "Surat Keterangan Domisili":
            specificContent = <p>Berdasarkan data kependudukan kami, nama tersebut di atas adalah benar penduduk yang berdomisili di alamat tersebut.</p>
            break;
            
        case "Surat Pengantar SKCK":
            specificContent = <p>Nama tersebut di atas, sepanjang pengetahuan dan pengamatan kami hingga surat ini dikeluarkan, berkelakuan baik di lingkungan masyarakat dan tidak pernah tersangkut perkara pidana atau perdata dengan warga lain.</p>
             closingParagraph = `Surat Keterangan ini dibuat sebagai pengantar untuk mendapatkan Surat Keterangan Catatan Kepolisian (SKCK) di Polsek ${villageProfile.kecamatan}. Demikian Surat Keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.`
            break;

        default:
            specificContent = <p>Bahwa nama tersebut di atas adalah benar penduduk Desa {villageProfile.nama_desa} yang datanya sesuai dengan data kependudukan kami.</p>
    }

    return (
        <div style={{ lineHeight: '1.8' }}>
            <p style={{ textIndent: '40px' }}>{openingParagraph}</p>
            <br />
            <table>
                <tbody>
                    {commonData.map(item => <DataRow key={item.label} label={item.label} value={item.value} />)}
                </tbody>
            </table>
            <br />
            <p style={{ textIndent: '40px' }}>{specificContent}</p>
            <br />
            <p style={{ textIndent: '40px' }} dangerouslySetInnerHTML={{__html: closingParagraph}} />
        </div>
    );
};
