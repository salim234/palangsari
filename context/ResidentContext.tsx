import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Resident } from '../types';
import { supabase } from '../lib/supabaseClient';

interface ResidentContextType {
  residents: Resident[];
  getResidentByNik: (nik: string) => Promise<Resident | null>;
  addResident: (resident: Omit<Resident, 'id'|'created_at'|'updated_at'>) => Promise<Resident | null>;
  updateResident: (updatedResident: Resident) => Promise<void>;
  deleteResident: (id: string) => Promise<void>;
}

export const ResidentContext = createContext<ResidentContextType>({
  residents: [],
  getResidentByNik: async () => null,
  addResident: async () => null,
  updateResident: async () => {},
  deleteResident: async () => {},
});

export const ResidentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [residents, setResidents] = useState<Resident[]>([]);

  const fetchResidents = async () => {
    const { data, error } = await supabase.from('residents').select('*').order('nama');
    if (error) console.error('Error fetching residents:', error);
    else setResidents(data as Resident[]);
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const getResidentByNik = async (nik: string): Promise<Resident | null> => {
    const { data, error } = await supabase.from('residents').select('*').eq('nik', nik).single();
    if (error && error.code !== 'PGRST116') { // Ignore 'not found' error
        console.error('Error fetching resident by NIK:', error);
        return null;
    }
    return data as Resident | null;
  };

  const addResident = async (resident: Omit<Resident, 'id'|'created_at'|'updated_at'>): Promise<Resident | null> => {
    const { data, error } = await supabase.from('residents').insert([resident]).select().single();
    if (error) {
        console.error('Error adding resident:', error);
        return null;
    }
    if (data) {
        setResidents(prev => [...prev, data]);
        return data;
    }
    return null;
  };

  const updateResident = async (updatedResident: Resident) => {
    const { id, ...itemToUpdate } = updatedResident;
    const { data, error } = await supabase.from('residents').update(itemToUpdate).eq('id', id).select().single();
    if (error) console.error('Error updating resident:', error);
    else if (data) setResidents(prev => prev.map(r => (r.id === id ? data : r)));
  };

  const deleteResident = async (id: string) => {
    const { error } = await supabase.from('residents').delete().eq('id', id);
    if (error) console.error('Error deleting resident:', error);
    else setResidents(prev => prev.filter(r => r.id !== id));
  };

  return (
    <ResidentContext.Provider value={{ residents, getResidentByNik, addResident, updateResident, deleteResident }}>
      {children}
    </ResidentContext.Provider>
  );
};
