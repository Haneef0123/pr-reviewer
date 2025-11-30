"use client";

import React from 'react';
import FrameLayout from "@/components/FrameLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { GitPullRequest, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useApp } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { fetchPRs, fetchPRDiff } from "@/app/actions/github";
import { generateReview } from "@/app/actions/review";

// Mock Data
const stats = [
  { label: 'Total PRs', value: '12', icon: GitPullRequest, color: 'text-blue-600' },
  { label: 'Reviewed', value: '8', icon: CheckCircle, color: 'text-green-600' },
  { label: 'Pending', value: '3', icon: Clock, color: 'text-yellow-600' },
  { label: 'Issues', value: '1', icon: AlertCircle, color: 'text-red-600' },
];

const prs = [
  { id: 1, title: 'feat: Add user authentication', repo: 'frontend-app', author: 'johndoe', status: 'reviewed', time: '2h ago' },
  { id: 2, title: 'fix: Navigation bug on mobile', repo: 'frontend-app', author: 'janedoe', status: 'pending', time: '4h ago' },
  { id: 3, title: 'chore: Update dependencies', repo: 'backend-api', author: 'bobsmith', status: 'approved', time: '1d ago' },
  { id: 4, title: 'refactor: Optimize database queries', repo: 'backend-api', author: 'alice', status: 'changes_requested', time: '1d ago' },
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'reviewed': return 'info';
    case 'approved': return 'success';
    case 'changes_requested': return 'error';
    case 'pending': return 'warning';
    default: return 'neutral';
  }
};

export default function Dashboard() {
  const { githubToken, repository, addLog } = useApp();
  const [prs, setPrs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewingId, setReviewingId] = useState<number | null>(null);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  useEffect(() => {
    if (githubToken && repository) {
      loadPRs();
    }
  }, [githubToken, repository]);

  const loadPRs = async () => {
    setLoading(true);
    addLog('INFO', `Fetching PRs for ${repository}...`);
    const res = await fetchPRs(githubToken, repository);
    if (res.error) {
      addLog('ERROR', res.error);
    } else {
      setPrs(res.data || []);
      addLog('SUCCESS', `Fetched ${res.data?.length} PRs.`);
    }
    setLoading(false);
  };

  const handleReview = async (prId: number) => {
    setReviewingId(prId);
    addLog('INFO', `Fetching diff for PR #${prId}...`);
    
    // 1. Fetch Diff
    const diffRes = await fetchPRDiff(githubToken, repository, prId);
    if (diffRes.error) {
      addLog('ERROR', `Failed to fetch diff: ${diffRes.error}`);
      setReviewingId(null);
      return;
    }

    addLog('INFO', `Generating review for PR #${prId} using Groq...`);
    
    // 2. Generate Review
    const reviewRes = await generateReview(diffRes.data as string);
    if (reviewRes.error) {
      addLog('ERROR', `Review generation failed: ${reviewRes.error}`);
    } else {
      addLog('SUCCESS', `Review generated for PR #${prId}.`);
      setSelectedReview(reviewRes.data as string);
    }
    setReviewingId(null);
  };

  return (
    <FrameLayout>
      <Header />
      <main className="flex-1 relative overflow-y-auto p-8 pt-24">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#111111]">{stat.value}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* PR List */}
          <Card title={`Pull Requests (${repository || 'No Repo Configured'})`}>
            {!githubToken ? (
              <div className="text-center py-8 text-gray-500">
                Please configure your GitHub Token in Settings.
              </div>
            ) : loading ? (
              <div className="text-center py-8 text-gray-500">Loading PRs...</div>
            ) : (
              <div className="space-y-4">
                {prs.map((pr) => (
                  <div key={pr.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <GitPullRequest className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <a href={pr.url} target="_blank" rel="noreferrer" className="font-medium text-[#111111] hover:underline">
                          {pr.title}
                        </a>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          <span>#{pr.id}</span>
                          <span>•</span>
                          <span>by {pr.author}</span>
                          <span>•</span>
                          <span>{pr.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="neutral">Open</Badge>
                      <button 
                        onClick={() => handleReview(pr.id)}
                        disabled={reviewingId === pr.id}
                        className="bg-black text-white text-sm px-4 py-2 rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors"
                      >
                        {reviewingId === pr.id ? 'Reviewing...' : 'Analyze'}
                      </button>
                    </div>
                  </div>
                ))}
                {prs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No open PRs found.</div>
                )}
              </div>
            )}
          </Card>

          {/* Review Modal/Panel */}
          {selectedReview && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold">AI Review</h3>
                  <button onClick={() => setSelectedReview(null)} className="text-gray-500 hover:text-black">Close</button>
                </div>
                <div className="p-6 overflow-y-auto prose max-w-none">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-900 leading-relaxed">{selectedReview}</pre>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </FrameLayout>
  );
}
