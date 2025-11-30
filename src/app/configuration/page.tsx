"use client";

import React from 'react';
import FrameLayout from "@/components/FrameLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import { useApp } from "@/context/AppContext";
import { useState } from "react";

export default function Configuration() {
  const { 
    githubToken, setGithubToken, 
    repository, setRepository 
  } = useApp();

  return (
    <FrameLayout>
      <Header />
      <main className="flex-1 relative overflow-y-auto p-8 pt-24">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#111111] mb-2">Configuration</h1>
            <p className="text-gray-500">Manage your bot settings and integrations.</p>
          </div>

          <Card title="GitHub Integration">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Access Token (PAT)
                </label>
                <input 
                  type="password" 
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Required to fetch PRs and post comments.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repository (owner/repo)
                </label>
                <input 
                  type="text" 
                  value={repository}
                  onChange={(e) => setRepository(e.target.value)}
                  placeholder="facebook/react"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                />
              </div>
            </div>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Groq API Key should be configured in your <code className="bg-blue-100 px-1 rounded">.env.local</code> file as <code className="bg-blue-100 px-1 rounded">GROQ_API_KEY</code>
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <p className="text-sm text-green-600 self-center">
              Changes are saved automatically.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </FrameLayout>
  );
}
