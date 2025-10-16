import React, { ReactNode } from 'react';
import { VillageProvider } from '../context/VillageContext';
import { ProfileProvider } from '../context/ProfileContext';
import { NewsProvider } from '../context/NewsContext';
import { OfficialProvider } from '../context/OfficialContext';
import { LembagaProvider } from '../context/LembagaContext';
import { LetterProvider } from '../context/LetterContext';
import { ResidentProvider } from '../context/ResidentContext';
import { AuthProvider } from '../context/AuthContext';
import { APBDesProvider } from '../context/APBDesContext';
import { TourismProvider } from '../context/TourismContext';

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <VillageProvider>
      <ProfileProvider>
        <NewsProvider>
          <OfficialProvider>
            <LembagaProvider>
              <LetterProvider>
                <ResidentProvider>
                  <AuthProvider>
                    <APBDesProvider>
                      <TourismProvider>
                        {children}
                      </TourismProvider>
                    </APBDesProvider>
                  </AuthProvider>
                </ResidentProvider>
              </LetterProvider>
            </LembagaProvider>
          </OfficialProvider>
        </NewsProvider>
      </ProfileProvider>
    </VillageProvider>
  );
};

export default AppProviders;
