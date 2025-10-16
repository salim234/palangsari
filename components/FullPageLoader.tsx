import React from 'react';

const FullPageLoader: React.FC = () => (
    <div className="flex items-center justify-center fixed inset-0 bg-white bg-opacity-75 z-[9999]">
        <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-600"></div>
            <p className="mt-4 text-lg text-gray-700">Memuat halaman...</p>
        </div>
    </div>
);

export default FullPageLoader;
