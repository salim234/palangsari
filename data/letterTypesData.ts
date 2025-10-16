
export interface LetterFormField {
    name: string; // e.g., 'businessName'
    label: string; // e.g., 'Nama Usaha'
    type: 'text' | 'date' | 'textarea' | 'number';
    placeholder?: string;
    required: boolean;
}

export interface LetterTypeOption {
    code: string;
    name: string;
    description: string;
    fields: LetterFormField[];
}

export interface LetterCategory {
    category: string;
    codePrefix: string;
    options: LetterTypeOption[];
}

export const letterCategories: LetterCategory[] = [
    {
        category: "Kependudukan & Keterangan Warga",
        codePrefix: "474",
        options: [
            { code: "474.1", name: "Surat Keterangan Domisili", description: "Untuk mengurus atau melengkapi persyaratan administrasi yang membutuhkan bukti tempat tinggal.", fields: [] },
            { 
                code: "474.2", 
                name: "Surat Keterangan Usaha (SKU)", 
                description: "Sebagai legalitas usaha mikro untuk keperluan perbankan atau perizinan lainnya.",
                fields: [
                    { name: "namaUsaha", label: "Nama Usaha", type: "text", placeholder: "Contoh: Warung Barokah", required: true },
                    { name: "jenisUsaha", label: "Jenis Usaha", type: "text", placeholder: "Contoh: Toko Kelontong", required: true },
                    { name: "alamatUsaha", label: "Alamat Usaha", type: "textarea", placeholder: "Contoh: Jl. Raya Palangsari No. 10", required: true },
                ]
            },
            { code: "474.3", name: "Surat Keterangan Tidak Mampu (SKTM)", description: "Digunakan untuk mengajukan keringanan biaya pendidikan, kesehatan, atau bantuan sosial.", fields: [
                 { name: "keperluanSktm", label: "Keperluan SKTM", type: "text", placeholder: "Contoh: Pengajuan Beasiswa KIP", required: true },
            ]},
            { code: "474.4", name: "Surat Keterangan Kelahiran", description: "Sebagai dasar untuk pembuatan Akta Kelahiran di Dinas Kependudukan.", fields: [
                { name: "namaAnak", label: "Nama Lengkap Anak", type: "text", required: true },
                { name: "tanggalLahirAnak", label: "Tanggal Lahir Anak", type: "date", required: true },
                { name: "namaAyah", label: "Nama Ayah", type: "text", required: true },
                { name: "namaIbu", label: "Nama Ibu", type: "text", required: true },
            ]},
            { 
                code: "474.5", 
                name: "Surat Keterangan Kematian", 
                description: "Diperlukan untuk mengurus Akta Kematian, klaim asuransi, atau urusan waris.",
                fields: [
                    { name: "namaAlmarhum", label: "Nama Almarhum/Almarhumah", type: "text", required: true },
                    { name: "tanggalKematian", label: "Tanggal Kematian", type: "date", required: true },
                    { name: "tempatKematian", label: "Tempat Kematian", type: "text", placeholder: "Contoh: Rumah Sakit, Rumah", required: true },
                    { name: "penyebabKematian", label: "Penyebab Kematian", type: "text", placeholder: "Contoh: Sakit", required: true },
                ]
            },
            { code: "474.6", name: "Surat Keterangan Belum Menikah", description: "Biasanya diperlukan untuk persyaratan melamar pekerjaan atau pendaftaran pernikahan.", fields: [] },
            { code: "474.7", name: "Surat Keterangan Janda / Duda", description: "Untuk mengurus administrasi yang memerlukan bukti status perkawinan.", fields: [] },
            { code: "474.8", name: "Surat Keterangan Ahli Waris", description: "Digunakan dalam proses pembagian harta warisan sesuai hukum yang berlaku.", fields: [] },
            { 
                code: "474.9", 
                name: "Surat Keterangan Pindah / Datang", 
                description: "Sebagai pengantar untuk mengurus perpindahan penduduk antar daerah.",
                fields: [
                     { name: "alamatTujuan", label: "Alamat Tujuan Pindah", type: "textarea", required: true },
                     { name: "jumlahKeluarga", label: "Jumlah Anggota Keluarga Pindah", type: "number", placeholder: "1", required: true },
                     { name: "alasanPindah", label: "Alasan Pindah", type: "text", placeholder: "Contoh: Pekerjaan", required: true },
                ]
            },
            { code: "474.10", name: "Surat Pengantar SKCK", description: "Sebagai pengantar dari desa untuk membuat SKCK di Polsek atau Polres.", fields: [] },
            { code: "474.11", name: "Surat Keterangan Beda Nama", description: "Untuk menyatakan bahwa beberapa nama pada dokumen yang berbeda merujuk pada orang yang sama.", fields: [
                { name: "namaDokumen1", label: "Nama di Dokumen 1 (Contoh: KTP)", type: "text", required: true },
                { name: "namaDokumen2", label: "Nama di Dokumen 2 (Contoh: Ijazah)", type: "text", required: true },
            ] },
            { code: "474.12", name: "Surat Keterangan Kepemilikan Tanah / Bangunan", description: "Sebagai bukti kepemilikan lokal yang belum bersertifikat (Letter C/Girik).", fields: [] },
            { code: "474.13", name: "Surat Keterangan Jalan / Bepergian", description: "Surat pengantar untuk melakukan perjalanan ke luar daerah untuk tujuan tertentu.", fields: [] },
            { code: "474.14", name: "Surat Pengantar Kehilangan", description: "Sebagai pengantar dari desa untuk membuat laporan kehilangan di kantor polisi.", fields: [
                 { name: "barangHilang", label: "Barang/Dokumen yang Hilang", type: "text", placeholder: "Contoh: KTP, STNK", required: true },
                 { name: "lokasiKehilangan", label: "Perkiraan Lokasi Kehilangan", type: "text", required: true },
            ] },
            { code: "474.15", name: "Surat Keterangan Kesehatan / Pengantar RS", description: "Sebagai surat pengantar untuk mendapatkan perawatan atau rujukan medis lebih lanjut.", fields: [] },
            { code: "474.16", name: "Surat Rekomendasi Beasiswa", description: "Surat rekomendasi dari pihak desa untuk mendukung pengajuan beasiswa.", fields: [] },
            { code: "474.17", name: "Surat Keterangan Tidak Pernah Dipidana", description: "Pengantar untuk mengurus surat keterangan catatan kepolisian atau keperluan lainnya.", fields: [] },
            { code: "474.18", name: "Surat Keterangan Waris Bersama", description: "Digunakan untuk menyatakan ahli waris yang lebih dari satu orang (kolektif).", fields: [] },
        ]
    },
    {
        category: "Kesejahteraan Sosial",
        codePrefix: "650",
        options: [
            { code: "650.1", name: "Surat Rekomendasi Program Kesehatan", description: "Rekomendasi untuk mengikuti program kesehatan dari Puskesmas atau Dinas Kesehatan.", fields: [] },
            { code: "650.2", name: "Surat Keterangan Sakit / Sehat", description: "Keterangan dari bidan desa atau petugas kesehatan mengenai kondisi kesehatan warga.", fields: [] },
            { code: "650.3", name: "Surat Keterangan Bencana / Kerusakan", description: "Untuk mendata korban dan kerugian akibat bencana alam sebagai dasar pengajuan bantuan.", fields: [] },
            { code: "650.4", name: "Surat Permohonan Bantuan Sosial", description: "Surat permohonan untuk mendapatkan bantuan dari Dinsos, BPBD, atau lembaga lain.", fields: [] },
            { code: "650.5", name: "Surat Pernyataan Gotong Royong", description: "Surat untuk menyatakan partisipasi atau penyelenggaraan kegiatan sosial di masyarakat.", fields: [] },
            { code: "650.6", name: "Surat Keterangan Pendidikan", description: "Untuk menyatakan bahwa seseorang masih aktif sebagai siswa/mahasiswa atau telah lulus.", fields: [] },
            { code: "650.7", name: "Surat Rekomendasi Beasiswa (Sosial)", description: "Dukungan dari desa untuk pengajuan beasiswa bagi warga kurang mampu.", fields: [] },
            { code: "650.8", name: "Surat Keterangan Lingkungan / Sanitasi", description: "Menyatakan kondisi kebersihan dan sanitasi di lingkungan tempat tinggal.", fields: [] },
        ]
    },
    {
        category: "Ketentraman & Ketertiban Umum",
        codePrefix: "800",
        options: [
            { code: "800.1", name: "Surat Izin Keramaian", description: "Untuk menyelenggarakan acara yang melibatkan banyak orang seperti hajatan atau pertunjukan.", fields: [
                { name: "namaAcara", label: "Nama Acara", type: "text", placeholder: "Contoh: Resepsi Pernikahan", required: true },
                { name: "tanggalAcara", label: "Tanggal Acara", type: "date", required: true },
                { name: "lokasiAcara", label: "Lokasi Acara", type: "textarea", required: true },
            ] },
            { code: "800.2", name: "Surat Keterangan Peternakan / Hewan", description: "Menyatakan kepemilikan hewan ternak untuk keperluan jual beli atau pendataan.", fields: [] },
            { code: "800.3", name: "Surat Rekomendasi UMKM", description: "Rekomendasi dari desa untuk pengajuan bantuan atau program pengembangan UMKM.", fields: [] },
            { code: "800.4", name: "Surat Pengantar Penelitian / Magang", description: "Surat izin untuk melakukan kegiatan penelitian, KKN, atau magang di wilayah desa.", fields: [] },
        ]
    }
];