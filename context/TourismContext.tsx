import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { TourismSpot } from '../types';
import { supabase } from '../lib/supabaseClient';

interface TourismContextType {
  spots: TourismSpot[];
  addSpot: (spot: Omit<TourismSpot, 'id'|'created_at'|'updated_at'>) => Promise<void>;
  updateSpot: (updatedSpot: TourismSpot) => Promise<void>;
  deleteSpot: (id: string) => Promise<void>;
}

export const TourismContext = createContext<TourismContextType>({
  spots: [],
  addSpot: async () => {},
  updateSpot: async () => {},
  deleteSpot: async () => {},
});

export const TourismProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [spots, setSpots] = useState<TourismSpot[]>([]);

  useEffect(() => {
    const fetchSpots = async () => {
      const { data, error } = await supabase.from('tourism_spots').select('*').order('created_at', { ascending: true });
      if (error) console.error('Error fetching tourism spots:', error);
      else setSpots(data as TourismSpot[]);
    };
    fetchSpots();
  }, []);

  const addSpot = async (spot: Omit<TourismSpot, 'id'|'created_at'|'updated_at'>) => {
    const { data, error } = await supabase.from('tourism_spots').insert([spot]).select();
    if (error) console.error('Error adding spot:', error);
    else if (data) setSpots(prev => [...prev, data[0]]);
  };

  const updateSpot = async (updatedSpot: TourismSpot) => {
    const { id, ...spotToUpdate } = updatedSpot;
    const { data, error } = await supabase.from('tourism_spots').update(spotToUpdate).eq('id', id).select();
    if (error) console.error('Error updating spot:', error);
    else if (data) setSpots(prev => prev.map(s => (s.id === id ? data[0] : s)));
  };

  const deleteSpot = async (id: string) => {
    const { error } = await supabase.from('tourism_spots').delete().eq('id', id);
    if (error) console.error('Error deleting spot:', error);
    else setSpots(prev => prev.filter(s => s.id !== id));
  };

  return (
    <TourismContext.Provider value={{ spots, addSpot, updateSpot, deleteSpot }}>
      {children}
    </TourismContext.Provider>
  );
};
