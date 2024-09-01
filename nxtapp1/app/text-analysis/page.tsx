'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const analysisTypes = [
  'Named Entity Recognition',
  'Summarization',
  'Translation',
  'Sentiment Analysis',
  'Entity Relationship Analysis',
  'Topic Modeling',
  'Keyword Extraction',
  'Text Classification',
  'Semantic Similarity',
];

const defaultInstructions: { [key: string]: string } = {
  'Named Entity Recognition': 'Identify and categorize named entities (e.g., person names, organizations, locations) in the text.',
  'Summarization': 'Provide a concise summary of the main points in the text.',
  'Translation': 'Translate the text to [target language]. Please specify the target language.',
  'Sentiment Analysis': 'Analyze the overall sentiment of the text (positive, negative, or neutral) and provide a brief explanation.',
  'Entity Relationship Analysis': 'Identify key entities in the text and describe their relationships to each other.',
  'Topic Modeling': 'Identify the main topics discussed in the text and provide a brief description of each.',
  'Keyword Extraction': 'Extract the most important keywords or phrases from the text.',
  'Text Classification': 'Classify the text into appropriate categories or genres.',
  'Semantic Similarity': 'Compare the semantic similarity between different parts of the text or with a provided reference text.',
};

interface AnalysisResponse {
  id: number;
  type: string;
  instruction: string;
  request: string;
  response: string;
}

export default function TextAnalysis() {
  const [text, setText] = useState('');
  const [instruction, setInstruction] = useState(defaultInstructions[analysisTypes[0]]);
  const [analysisType, setAnalysisType] = useState(analysisTypes[0]);
  const [responses, setResponses] = useState<AnalysisResponse[]>([]);
  const [selectedResponses, setSelectedResponses] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedResponses, setExpandedResponses] = useState<number[]>([]);

  useEffect(() => {
    setInstruction(defaultInstructions[analysisType]);
  }, [analysisType]);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);

    const context = responses
      .filter((r) => selectedResponses.includes(r.id))
      .map((r) => `Type: ${r.type}\nInstruction: ${r.instruction}\nResponse: ${r.response}`)
      .join('\n\n');

    const prompt = `${context}\n\nCurrent Request:\nType: ${analysisType}\nInstruction: ${instruction}\nText: ${text}\n\nPlease perform the requested analysis.`;

    try {
      const backendAvailable = typeof window !== "undefined" ? window.backendAvailable : true;
      const apiKey = typeof window !== "undefined" ? window.openRouterApiKey : "";

      if (!backendAvailable && !apiKey) {
        throw new Error('API key is required when backend is not available');
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${backendAvailable ? process.env.NEXT_PUBLIC_OPENROUTER_API_KEY : apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.1-8b-instruct:free",
          "messages": [
            {"role": "user", "content": prompt},
          ],
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from API');
      }

      const data = await response.json();
      const analysisResponse = data.choices[0].message.content;

      const newResponse: AnalysisResponse = {
        id: responses.length + 1,
        type: analysisType,
        instruction,
        request: prompt,
        response: analysisResponse,
      };

      setResponses([...responses, newResponse]);
      setExpandedResponses([...expandedResponses, newResponse.id]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleResponseExpansion = (id: number) => {
    setExpandedResponses(
      expandedResponses.includes(id)
        ? expandedResponses.filter((responseId) => responseId !== id)
        : [...expandedResponses, id]
    );
  };

  const handleExport = () => {
    let markdown = "# Text Analysis Log\n\n";

    responses.forEach((response, index) => {
      markdown += `## Analysis ${index + 1}\n\n`;
      markdown += `- **Type**: ${response.type}\n`;
      markdown += `- **Instruction**: ${response.instruction}\n`;
      markdown += `- **Text**: ${text}\n\n`;
      markdown += "### Request\n\n";
      markdown += "```\n" + response.request + "\n```\n\n";
      markdown += "### Response\n\n";
      markdown += "```\n" + response.response + "\n```\n\n";
      markdown += "---\n\n";
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text_analysis_log.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Text Analysis</h1>
        <Link href="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to Dashboard
          </button>
        </Link>
      </div>
      <div className="space-y-4">
        <textarea
          className="w-full p-2 bg-gray-800 rounded"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze"
        />
        <div className="flex space-x-4">
          <select
            className="w-1/2 p-2 bg-gray-800 rounded"
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
          >
            {analysisTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <textarea
            className="w-1/2 p-2 bg-gray-800 rounded"
            rows={3}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Enter analysis instructions"
          />
        </div>
        <button
          className={`w-full p-2 rounded ${isLoading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={handleAnalysis}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="mt-8 space-y-4">
        {responses.map((response) => (
          <div key={response.id} className="bg-gray-800 p-4 rounded">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedResponses.includes(response.id)}
                  onChange={() => {
                    setSelectedResponses(
                      selectedResponses.includes(response.id)
                        ? selectedResponses.filter((id) => id !== response.id)
                        : [...selectedResponses, response.id]
                    );
                  }}
                  className="mr-2"
                />
                <h3 className="text-xl font-semibold">{response.type} Analysis</h3>
              </div>
              <button
                onClick={() => toggleResponseExpansion(response.id)}
                className="text-blue-400 hover:text-blue-300"
              >
                {expandedResponses.includes(response.id) ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <p className="mb-2">Instruction: {response.instruction}</p>
            {expandedResponses.includes(response.id) && (
              <>
                <details className="mb-2">
                  <summary className="cursor-pointer">View Request</summary>
                  <pre className="bg-gray-700 p-2 rounded mt-2 whitespace-pre-wrap">
                    {response.request}
                  </pre>
                </details>
                <h4 className="font-semibold mb-1">Response:</h4>
                <div className="bg-gray-700 p-2 rounded whitespace-pre-wrap">
                  {response.response}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}