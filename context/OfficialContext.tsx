import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Official } from '../types';
import { supabase } from '../lib/supabaseClient';

interface OfficialContextType {
  officials: Official[];
  addOfficial: (official: Omit<Official, 'id'|'created_at'|'updated_at'>) => Promise<void>;
  updateOfficial: (updatedOfficial: Official) => Promise<void>;
  deleteOfficial: (id: string) => Promise<void>;
}

export const OfficialContext = createContext<OfficialContextType>({
  officials: [],
  addOfficial: async () => {},
  updateOfficial: async () => {},
  deleteOfficial: async () => {},
});

export const OfficialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [officials, setOfficials] = useState<Official[]>([]);

  useEffect(() => {
    const fetchOfficials = async () => {
      const { data, error } = await supabase.from('officials').select('*').order('created_at', { ascending: true });
      if (error) console.error('Error fetching officials:', error);
      else setOfficials(data as Official[]);
    };
    fetchOfficials();
  }, []);

  const addOfficial = async (official: Omit<Official, 'id'|'created_at'|'updated_at'>) => {
    const { data, error } = await supabase.from('officials').insert([official]).select();
    if (error) console.error('Error adding official:', error);
    else if (data) setOfficials(prev => [...prev, data[0]]);
  };

  const updateOfficial = async (updatedOfficial: Official) => {
    const { id, ...officialToUpdate } = updatedOfficial;
    const { data, error } = await supabase.from('officials').update(officialToUpdate).eq('id', id).select();
    if (error) console.error('Error updating official:', error);
    else if (data) setOfficials(prev => prev.map(o => (o.id === id ? data[0] : o)));
  };

  const deleteOfficial = async (id: string) => {
    const { error } = await supabase.from('officials').delete().eq('id', id);
    if (error) console.error('Error deleting official:', error);
    else setOfficials(prev => prev.filter(o => o.id !== id));
  };

  return (
    <OfficialContext.Provider value={{ officials, addOfficial, updateOfficial, deleteOfficial }}>
      {children}
    </OfficialContext.Provider>
  );
};
