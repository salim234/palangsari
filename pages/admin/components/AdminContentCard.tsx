import React from 'react';

interface AdminContentCardProps {
  title?: string;
  children: React.ReactNode;
}

const AdminContentCard: React.FC<AdminContentCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200/80">
      {title && <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>}
      {children}
    </div>
  );
};

export default AdminContentCard;