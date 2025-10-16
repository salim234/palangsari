import React from 'react';

interface AdminPageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({ title, children }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      <div className="flex space-x-2">
        {children}
      </div>
    </div>
  );
};

export default AdminPageHeader;
