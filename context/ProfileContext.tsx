import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { ProfileData } from '../types';
import { supabase } from '../lib/supabaseClient';

const defaultProfile: ProfileData = {
    id: 1,
    sejarah: '<p>Loading...</p>',
    visi: 'Loading...',
    misi: [],
    demografi: {
        luas_wilayah: "0 Ha",
        jumlah_penduduk: 0,
        pria: 0,
        wanita: 0,
        jumlah_kk: 0,
    },
    updated_at: ''
};

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (updatedProfile: Omit<ProfileData, 'id' | 'updated_at'>) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: defaultProfile,
  updateProfile: async () => {},
});

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('village_static_profile')
        .select('*')
        .eq('id', 1)
        .limit(1); // Fetch at most one row
        
      if (error) {
        console.error('Error fetching village static profile:', error.message || error);
      } else if (data && data.length > 0) {
        setProfile(data[0] as ProfileData);
      }
    };
    fetchProfile();
  }, []);


  const updateProfile = async (updatedProfile: Omit<ProfileData, 'id'|'updated_at'>) => {
    const { data, error } = await supabase
        .from('village_static_profile')
        .update(updatedProfile)
        .eq('id', 1)
        .select();
    if (error) {
        console.error('Error updating profile:', error)
    } else if (data && data.length > 0) {
        setProfile(data[0] as ProfileData);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};