
import { useState, useCallback } from 'react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage, ChatRole } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: ChatRole.MODEL,
      text: 'Halo! Saya asisten virtual Desa Palangsari. Ada yang bisa saya bantu?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = { role: ChatRole.USER, text };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));
      
      const responseText = await generateChatResponse(text, history);
      const modelMessage: ChatMessage = { role: ChatRole.MODEL, text: responseText };
      setMessages(prevMessages => [...prevMessages, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: ChatRole.MODEL,
        text: 'Maaf, terjadi gangguan. Silakan coba lagi.',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return { messages, isLoading, sendMessage };
};