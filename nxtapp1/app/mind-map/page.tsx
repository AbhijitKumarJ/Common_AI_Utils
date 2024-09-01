'use client';

import { useState } from 'react';
import Link from 'next/link';
import MindMapGenerator from './MindMapGenerator';
import MindMapDisplay from './MindMapDisplay';

export default function MindMapPage() {
  const [mindMap, setMindMap] = useState(null);
  const [logs, setLogs] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Mind Map Generator</h1>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to Dashboard
          </button>
        </Link>
      </div>
      <MindMapGenerator setMindMap={setMindMap} setLogs={setLogs} />
      {mindMap && <MindMapDisplay mindMap={mindMap} />}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">API Logs</h2>
        {logs.map((log, index) => (
          <div key={index} className="mb-4 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Request {index + 1}</h3>
            <pre className="bg-gray-700 p-2 rounded mb-2 overflow-x-auto">
              {JSON.stringify(log.request, null, 2)}
            </pre>
            <h3 className="text-xl font-semibold mb-2">Response {index + 1}</h3>
            <pre className="bg-gray-700 p-2 rounded overflow-x-auto">
              {JSON.stringify(log.response, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
