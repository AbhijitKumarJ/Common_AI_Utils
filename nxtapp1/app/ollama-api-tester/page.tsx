"use client";

import OllamaApiTester from '@/components/OllamaApiTester';
import Link from 'next/link';

export default function OllamaApiTesterPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Ollama API Tester</h1>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to Dashboard
          </button>
        </Link>
      </div>
      <OllamaApiTester />
    </div>
  );
}