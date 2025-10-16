import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { APBDesData } from '../types';
import { supabase } from '../lib/supabaseClient';

interface APBDesContextType {
  data: APBDesData[];
  addData: (item: Omit<APBDesData, 'created_at' | 'updated_at'>) => Promise<void>;
  updateData: (updatedItem: Omit<APBDesData, 'created_at' | 'updated_at'>) => Promise<void>;
  deleteData: (year: number) => Promise<void>;
}

export const APBDesContext = createContext<APBDesContextType>({
  data: [],
  addData: async () => {},
  updateData: async () => {},
  deleteData: async () => {},
});

export const APBDesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<APBDesData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
        const { data: apbdesData, error } = await supabase.from('apbdes_reports').select('*').order('tahun', { ascending: false });
        if (error) console.error('Error fetching APBDes data:', error);
        else setData(apbdesData as APBDesData[]);
    };
    fetchData();
  }, []);

  const addData = async (item: Omit<APBDesData, 'created_at' | 'updated_at'>) => {
    const { data: newItems, error } = await supabase.from('apbdes_reports').insert([item]).select();
    if (error) console.error('Error adding APBDes data:', error);
    else if (newItems) setData(prev => [...prev, newItems[0]].sort((a,b) => b.tahun - a.tahun));
  };

  const updateData = async (updatedItem: Omit<APBDesData, 'created_at' | 'updated_at'>) => {
    const { data: updated, error } = await supabase.from('apbdes_reports').update(updatedItem).eq('tahun', updatedItem.tahun).select();
    if (error) console.error('Error updating APBDes data:', error);
    else if (updated) setData(prev => prev.map(d => (d.tahun === updatedItem.tahun ? updated[0] : d)));
  };

  const deleteData = async (year: number) => {
    const { error } = await supabase.from('apbdes_reports').delete().eq('tahun', year);
    if (error) console.error('Error deleting APBDes data:', error);
    else setData(prev => prev.filter(d => d.tahun !== year));
  };

  return (
    <APBDesContext.Provider value={{ data, addData, updateData, deleteData }}>
      {children}
    </APBDesContext.Provider>
  );
};
