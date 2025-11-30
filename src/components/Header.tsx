import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute top-8 left-0 right-0 flex justify-center z-10">
      <nav className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-full px-6 py-3 flex gap-8 shadow-sm">
        {[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Configuration', href: '/configuration' },
          { name: 'Logs', href: '/logs' },
        ].map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
