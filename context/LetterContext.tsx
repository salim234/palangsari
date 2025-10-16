import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { LetterRequest, LetterStatus } from '../types';
import { supabase } from '../lib/supabaseClient';

interface LetterContextType {
  requests: LetterRequest[];
  addLetterRequest: (request: Omit<LetterRequest, 'id' | 'tracking_id' | 'status' | 'created_at' | 'updated_at'>) => Promise<string | null>;
  updateLetterStatus: (id: string, status: LetterStatus) => Promise<void>;
}

export const LetterContext = createContext<LetterContextType>({
  requests: [],
  addLetterRequest: async () => null,
  updateLetterStatus: async () => {},
});

export const LetterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<LetterRequest[]>([]);

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('letter_requests')
      .select('*, residents(nama)')
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching letter requests:', error);
    // FIX: Changed 'any[]' to 'LetterRequest[]' to provide proper typing.
    else setRequests(data as LetterRequest[]);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const addLetterRequest = async (request: Omit<LetterRequest, 'id' | 'tracking_id' | 'status' | 'created_at' | 'updated_at'>): Promise<string | null> => {
    const tracking_id = `PS-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const newRequest = {
      ...request,
      tracking_id,
      status: 'Menunggu' as LetterStatus,
    };

    const { data, error } = await supabase
      .from('letter_requests')
      .insert([newRequest])
      .select();
    
    if (error) {
      console.error('Error adding letter request:', error);
      return null;
    }
    
    if (data) {
      await fetchRequests(); // Refresh list
      return tracking_id;
    }
    return null;
  };

  const updateLetterStatus = async (id: string, status: LetterStatus) => {
    const { data, error } = await supabase
      .from('letter_requests')
      .update({ status })
      .eq('id', id)
      .select('*, residents(nama)');
      
    if (error) {
      console.error('Error updating letter status:', error);
    } else if (data) {
      setRequests(prevRequests => 
        prevRequests.map(req => 
          // FIX: Changed 'any' to 'LetterRequest' to provide proper typing.
          req.id === id ? (data[0] as LetterRequest) : req
        )
      );
    }
  };

  return (
    <LetterContext.Provider value={{ requests, addLetterRequest, updateLetterStatus }}>
      {children}
    </LetterContext.Provider>
  );
};
