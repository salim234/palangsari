
// Chatbot types
export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

// Village Profile & Demografi
export interface Demografi {
    luas_wilayah: string;
    jumlah_penduduk: number;
    pria: number;
    wanita: number;
    jumlah_kk: number;
}

export interface ProfileData {
    id: number;
    sejarah: string;
    visi: string;
    misi: string[];
    demografi: Demografi;
    updated_at: string;
}

export interface VillageProfile {
    id: number;
    nama_desa: string;
    kecamatan: string;
    kabupaten: string;
    provinsi: string;
    kode_kemendagri: string;
    kode_surat: string;
    alamat_kantor: string;
    email: string;
    telepon: string;
    logo_url: string;
    nama_kepala_desa: string;
    nama_camat: string;
    pangkat_camat: string;
    nip_camat: string;
    updated_at: string;
}

// Content types
export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  published_date: string;
  image_url: string;
  excerpt: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface TourismSpot {
    id: string;
    name: string;
    type: string;
    description: string;
    image_url: string;
    created_at: string;
    updated_at: string;
}

// Government types
export interface Official {
  id: string;
  name: string;
  position: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface LembagaDesa {
  id: string;
  nama: string;
  singkatan: string;
  deskripsi: string;
  ketua: string;
  created_at: string;
  updated_at: string;
}

// Services & Resident types
export type LetterStatus = 'Menunggu' | 'Diproses' | 'Selesai' | 'Ditolak';

export interface LetterRequest {
  id: string;
  tracking_id: string;
  requester_nik: string;
  letter_type: string;
  details: Record<string, string | number>;
  notes?: string;
  status: LetterStatus;
  request_date: string;
  created_at: string;
  updated_at: string;
  residents?: { nama: string };
}

export interface Resident {
  id: string;
  nik: string;
  no_kk: string;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  alamat: string;
  rt: string;
  rw: string;
  agama: string;
  status_perkawinan: string;
  pekerjaan: string;
  kewarganegaraan: string;
  created_at: string;
  updated_at: string;
}

// APBDes types
export interface APBDesItem {
    kode: string;
    uraian: string;
    anggaran: number;
    realisasi: number;
}

export interface APBDesData {
    tahun: number;
    pendapatan: APBDesItem[];
    belanja: APBDesItem[];
    pembiayaan: APBDesItem[];
    created_at: string;
    updated_at: string;
}