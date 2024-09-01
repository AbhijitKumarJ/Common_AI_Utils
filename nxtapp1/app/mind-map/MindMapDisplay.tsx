'use client';

import { useState } from 'react';
import MindMapVisualization from './MindMapVisualization';

export default function MindMapDisplay({ mindMap }) {
  const [expandedNodes, setExpandedNodes] = useState(['Central Topic']);
  const [showVisualization, setShowVisualization] = useState(false);

  const toggleNode = (node) => {
    setExpandedNodes(prev =>
      prev.includes(node) ? prev.filter(n => n !== node) : [...prev, node]
    );
  };

  const renderNode = (key, value, depth = 0) => {
    const isExpanded = expandedNodes.includes(key);
    const hasChildren = typeof value === 'object' && Object.keys(value).length > 0;

    return (
      <div key={key} style={{ marginLeft: `${depth * 20}px` }} className="my-2">
        <span
          className="cursor-pointer text-gray-300 hover:text-indigo-400"
          onClick={() => hasChildren && toggleNode(key)}
        >
          {hasChildren && (isExpanded ? '▼ ' : '► ')}
          {key}
        </span>
        {isExpanded && hasChildren && (
          <div className="ml-4">
            {Object.entries(value).map(([k, v]) => renderNode(k, v, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mindMap, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "mind_map.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Generated Mind Map</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
        {renderNode(Object.keys(mindMap)[0], mindMap[Object.keys(mindMap)[0]])}
      </div>
      <div className="mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={exportJSON}
        >
          Export JSON
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowVisualization(true)}
        >
          Show Visualization
        </button>
      </div>
      {showVisualization && (
        <MindMapVisualization
          mindMap={mindMap}
          onClose={() => setShowVisualization(false)}
        />
      )}
    </div>
  );
}
