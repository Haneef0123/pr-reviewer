import React from 'react';

export default function Footer() {
  return (
    <footer className="absolute bottom-8 right-8 flex items-center gap-3">
      <span className="text-sm font-medium text-gray-500">Bot Status</span>
      <div className="w-12 h-7 bg-[#111111] rounded-full flex items-center px-1 cursor-pointer">
        <div className="w-5 h-5 bg-white rounded-full shadow-sm transform translate-x-5 transition-transform" />
      </div>
    </footer>
  );
}
