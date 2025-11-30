import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-[#111111] tracking-tight mb-6 max-w-4xl">
        Automated Code Reviews.
      </h1>
      <p className="text-xl md:text-2xl text-[#666666] max-w-2xl mb-10 font-light">
        Seamless GitHub integration with AI-powered feedback. 
        <br className="hidden md:block" />
        Elevate your code quality instantly.
      </p>
      
      <Link href="/dashboard">
        <button className="group flex items-center gap-3 bg-[#111111] text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:bg-[#333333] hover:scale-105 active:scale-95">
          Get Started
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  );
}
