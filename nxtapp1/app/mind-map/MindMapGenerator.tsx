'use client';

declare global {
  interface Window {
    openRouterApiKey?: string;
    backendAvailable?: boolean;
  }
}

import { useState } from 'react';

export default function MindMapGenerator({ setMindMap, setLogs }) {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [maxSubtopics, setMaxSubtopics] = useState(3);

  const callLLM = async (prompt) => {
    const backendAvailable = typeof window !== "undefined" ? window.backendAvailable : true;
    const apiKey = typeof window !== "undefined" ? window.openRouterApiKey : "";

    if (!backendAvailable && !apiKey) {
      throw new Error('API key is required when backend is not available');
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${backendAvailable ? process.env.NEXT_PUBLIC_OPENROUTER_API_KEY : apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_YOUR_SITE_URL,
        "X-Title": process.env.NEXT_PUBLIC_YOUR_SITE_NAME,
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "messages": [{ "role": "user", "content": prompt }],
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from API');
    }

    const data = await response.json();
    setLogs(logs => [...logs, { request: prompt, response: data }]);
    return data.choices[0].message.content;
  };

  const generateMindMap = async () => {
    setIsLoading(true);
    try {
      // Get central topic
      const centralTopicPrompt = `Given the following text, determine a central topic:\n\n${text}\n\nRespond with only the central topic.`;
      const centralTopic = await callLLM(centralTopicPrompt);

      // Get main topics
      const mainTopicsPrompt = `Given the central topic "${centralTopic}" and the following text, determine up to ${maxSubtopics} main topics:\n\n${text}\n\nRespond with a JSON array of main topics where each main topic is a string. Stricltly follow the JSON array format and nothing else.Don't output any additional characters outside of the JSON array.`;
      const mainTopicsResponse = await callLLM(mainTopicsPrompt);
      const mainTopics = JSON.parse(mainTopicsResponse);

      // Get subtopics for each main topic
      const mindMap = { [centralTopic]: {} };
      for (const topic of mainTopics) {
        const subtopicsPrompt = `Given the main topic "${topic}" in the context of "${centralTopic}", determine up to ${maxSubtopics} subtopics based on the following text:\n\n${text}\n\nRespond with a JSON array of subtopics where each subtopic is a string. Stricltly follow the JSON array format and nothing else.Don't output any additional characters outside of the JSON array.`;
        const subtopicsResponse = await callLLM(subtopicsPrompt);
        const subtopics = JSON.parse(subtopicsResponse);
        mindMap[centralTopic][topic] = subtopics.reduce((acc, st) => ({ ...acc, [st]: {} }), {});
      }

      setMindMap(mindMap);
    } catch (error) {
      console.error('Error generating mind map:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <textarea
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      />
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <span className="mr-2">Max Subtopics:</span>
          <input
            type="number"
            min="1"
            max="5"
            value={maxSubtopics}
            onChange={(e) => setMaxSubtopics(parseInt(e.target.value))}
            className="w-16 p-2 bg-gray-800 border border-gray-700 rounded-md"
          />
        </label>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={generateMindMap}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Mind Map'}
        </button>
      </div>
    </div>
  );
}
