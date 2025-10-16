import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { LembagaDesa } from '../types';
import { supabase } from '../lib/supabaseClient';

interface LembagaContextType {
  lembaga: LembagaDesa[];
  addLembaga: (item: Omit<LembagaDesa, 'id'|'created_at'|'updated_at'>) => Promise<void>;
  updateLembaga: (updatedItem: LembagaDesa) => Promise<void>;
  deleteLembaga: (id: string) => Promise<void>;
}

export const LembagaContext = createContext<LembagaContextType>({
  lembaga: [],
  addLembaga: async () => {},
  updateLembaga: async () => {},
  deleteLembaga: async () => {},
});

export const LembagaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lembaga, setLembaga] = useState<LembagaDesa[]>([]);

  useEffect(() => {
    const fetchLembaga = async () => {
      const { data, error } = await supabase.from('institutions').select('*').order('created_at');
      if (error) console.error('Error fetching institutions:', error);
      else setLembaga(data as LembagaDesa[]);
    };
    fetchLembaga();
  }, []);


  const addLembaga = async (item: Omit<LembagaDesa, 'id'|'created_at'|'updated_at'>) => {
    const { data, error } = await supabase.from('institutions').insert([item]).select();
    if (error) console.error('Error adding institution:', error);
    else if (data) setLembaga(prev => [...prev, data[0]]);
  };

  const updateLembaga = async (updatedItem: LembagaDesa) => {
    const { id, ...itemToUpdate } = updatedItem;
    const { data, error } = await supabase.from('institutions').update(itemToUpdate).eq('id', id).select();
    if (error) console.error('Error updating institution:', error);
    else if (data) setLembaga(prev => prev.map(l => (l.id === id ? data[0] : l)));
  };

  const deleteLembaga = async (id: string) => {
    const { error } = await supabase.from('institutions').delete().eq('id', id);
    if (error) console.error('Error deleting institution:', error);
    else setLembaga(prev => prev.filter(l => l.id !== id));
  };

  return (
    <LembagaContext.Provider value={{ lembaga, addLembaga, updateLembaga, deleteLembaga }}>
      {children}
    </LembagaContext.Provider>
  );
};
