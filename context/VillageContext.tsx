import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { VillageProfile } from '../types';
import { supabase } from '../lib/supabaseClient';

const defaultVillageProfile: VillageProfile = {
    id: 1,
    nama_desa: "Palangsari",
    kecamatan: "Puspo",
    kabupaten: "Pasuruan",
    provinsi: "Jawa Timur",
    kode_kemendagri: "35.14.01.2001",
    kode_surat: "424.317.203",
    alamat_kantor: "Jl. Raya Palangsaari No. 1, Puspo, Pasuruan, Jawa Timur 67176",
    email: "info@palangsari.desa.id",
    telepon: "(0343) 123-456",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Lambang_Kabupaten_Pasuruan.png/120px-Lambang_Kabupaten_Pasuruan.png",
    nama_kepala_desa: "NAMA KEPALA DESA",
    nama_camat: "NAMA CAMAT",
    pangkat_camat: "Pangkat / Golongan",
    nip_camat: "NIP. 123456789012345678",
    updated_at: ''
};

interface VillageContextType {
  villageProfile: VillageProfile;
  updateVillageProfile: (updatedProfile: Omit<VillageProfile, 'id' | 'updated_at'>) => Promise<void>;
}

export const VillageContext = createContext<VillageContextType>({
  villageProfile: defaultVillageProfile,
  updateVillageProfile: async () => {},
});

export const VillageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [villageProfile, setVillageProfile] = useState<VillageProfile>(defaultVillageProfile);

  useEffect(() => {
    const fetchProfile = async () => {
        const { data, error } = await supabase
            .from('village_profile')
            .select('*')
            .eq('id', 1);
        
        if (error) {
            console.error('Error fetching village profile:', error.message || error);
        } else if (data && data.length > 0) {
            setVillageProfile(data[0] as VillageProfile);
        } else {
             // Fallback to default if no data is found in DB
            setVillageProfile(defaultVillageProfile);
        }
    };
    fetchProfile();
  }, []);

  const updateVillageProfile = async (updatedProfile: Omit<VillageProfile, 'id'|'updated_at'>) => {
    const { data, error } = await supabase
        .from('village_profile')
        .update(updatedProfile)
        .eq('id', 1)
        .select();
    
    if (error) {
        console.error('Error updating village profile:', error);
    } else if (data && data.length > 0) {
        setVillageProfile(data[0] as VillageProfile);
    }
  };

  return (
    <VillageContext.Provider value={{ villageProfile, updateVillageProfile }}>
      {children}
    </VillageContext.Provider>
  );
};
