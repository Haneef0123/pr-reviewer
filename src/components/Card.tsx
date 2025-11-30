import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-[#111111] mb-4">{title}</h3>
      )}
      {children}
    </div>
  );
}
