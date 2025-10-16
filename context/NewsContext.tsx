import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { NewsArticle } from '../types';
import { supabase } from '../lib/supabaseClient';

interface NewsContextType {
  articles: NewsArticle[];
  addArticle: (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateArticle: (updatedArticle: NewsArticle) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
}

export const NewsContext = createContext<NewsContextType>({
  articles: [],
  addArticle: async () => {},
  updateArticle: async () => {},
  deleteArticle: async () => {},
});

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_date', { ascending: false });
      if (error) console.error('Error fetching articles:', error);
      else setArticles(data as NewsArticle[]);
    };
    fetchArticles();
  }, []);

  const addArticle = async (article: Omit<NewsArticle, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('news_articles')
      .insert([article])
      .select();
    
    if (error) {
        console.error('Error adding article:', error);
    } else if (data) {
        setArticles(prevArticles => [data[0], ...prevArticles]);
    }
  };

  const updateArticle = async (updatedArticle: NewsArticle) => {
    const { id, ...articleToUpdate } = updatedArticle;
    const { data, error } = await supabase
      .from('news_articles')
      .update(articleToUpdate)
      .eq('id', id)
      .select();
      
    if (error) {
        console.error('Error updating article:', error);
    } else if (data) {
        setArticles(prevArticles => 
          prevArticles.map(article => 
            article.id === id ? data[0] : article
          )
        );
    }
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase
      .from('news_articles')
      .delete()
      .eq('id', id);
    
    if (error) {
        console.error('Error deleting article:', error);
    } else {
        setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
    }
  };

  return (
    <NewsContext.Provider value={{ articles, addArticle, updateArticle, deleteArticle }}>
      {children}
    </NewsContext.Provider>
  );
};
