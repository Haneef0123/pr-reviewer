"use client";

import React from 'react';
import FrameLayout from "@/components/FrameLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import { Terminal, Download, Trash2 } from 'lucide-react';
import { useApp } from "@/context/AppContext";

const getLevelColor = (level: string) => {
  switch (level) {
    case 'INFO': return 'text-blue-400';
    case 'SUCCESS': return 'text-green-400';
    case 'WARN': return 'text-yellow-400';
    case 'ERROR': return 'text-red-400';
    case 'DEBUG': return 'text-gray-400';
    default: return 'text-gray-200';
  }
};

export default function Logs() {
  const { logs, clearLogs } = useApp();

  return (
    <FrameLayout>
      <Header />
      <main className="flex-1 relative overflow-y-auto p-8 pt-24">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#111111] mb-2">System Logs</h1>
              <p className="text-gray-500">Real-time activity of the PR Reviewer Agent.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={clearLogs}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                title="Clear Logs"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col font-mono text-sm">
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">bot-output.log</span>
            </div>
            
            {/* Terminal Content */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {logs.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No logs yet. Start by fetching PRs from the Dashboard.</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex gap-3">
                    <span className="text-gray-500 shrink-0">[{log.timestamp}]</span>
                    <span className={`font-bold shrink-0 w-16 ${getLevelColor(log.level)}`}>{log.level}</span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))
              )}
              <div className="animate-pulse text-gray-500">_</div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </FrameLayout>
  );
}
