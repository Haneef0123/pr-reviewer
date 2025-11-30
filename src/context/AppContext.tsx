"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
}

interface AppState {
  githubToken: string;
  repository: string; // "owner/repo"
  logs: Log[];
  setGithubToken: (token: string) => void;
  setRepository: (repo: string) => void;
  addLog: (level: Log['level'], message: string) => void;
  clearLogs: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [githubToken, setGithubToken] = useState('');
  const [repository, setRepository] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedGh = localStorage.getItem('pr_agent_gh_token');
    const storedRepo = localStorage.getItem('pr_agent_repo');
    
    if (storedGh) setGithubToken(storedGh);
    if (storedRepo) setRepository(storedRepo);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (githubToken) localStorage.setItem('pr_agent_gh_token', githubToken);
  }, [githubToken]);

  useEffect(() => {
    if (repository) localStorage.setItem('pr_agent_repo', repository);
  }, [repository]);

  const addLog = (level: Log['level'], message: string) => {
    const newLog: Log = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleString(),
      level,
      message,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const clearLogs = () => setLogs([]);

  return (
    <AppContext.Provider value={{
      githubToken,
      repository,
      logs,
      setGithubToken,
      setRepository,
      addLog,
      clearLogs,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
