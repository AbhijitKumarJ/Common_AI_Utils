import React, { useState, useEffect } from 'react';
import { JsonView, allExpanded, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const API_ENDPOINTS = [
  { name: 'Generate', endpoint: '/api/generate', method: 'POST' },
  { name: 'Chat', endpoint: '/api/chat', method: 'POST' },
  { name: 'Create Model', endpoint: '/api/create', method: 'POST' },
  { name: 'List Models', endpoint: '/api/tags', method: 'GET' },
  { name: 'Show Model Info', endpoint: '/api/show', method: 'POST' },
  { name: 'Copy Model', endpoint: '/api/copy', method: 'POST' },
  { name: 'Delete Model', endpoint: '/api/delete', method: 'DELETE' },
  { name: 'Pull Model', endpoint: '/api/pull', method: 'POST' },
  { name: 'Push Model', endpoint: '/api/push', method: 'POST' },
  { name: 'Generate Embeddings', endpoint: '/api/embed', method: 'POST' },
  { name: 'List Running Models', endpoint: '/api/ps', method: 'GET' },
];

const OllamaApiTester: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('http://localhost:11434');
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [requestData, setRequestData] = useState('{\n  "model": "",\n  "prompt": "Why is the sky blue?"\n}');
  const [response, setResponse] = useState<any>(null);
  const [streaming, setStreaming] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [actualRequest, setActualRequest] = useState<any>(null);

  useEffect(() => {
    fetchModels();
  }, [baseUrl]);

  const fetchModels = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/tags`);
      const data = await res.json();
      setModels(data.models.map((model: any) => model.name));
      if (data.models.length > 0) {
        setSelectedModel(data.models[0].name);
        updateRequestDataModel(data.models[0].name);
      }
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };

  const handleBaseUrlChange = () => {
    fetchModels();
  };

  const handleEndpointChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const endpoint = API_ENDPOINTS.find(ep => ep.endpoint === e.target.value);
    if (endpoint) {
      setSelectedEndpoint(endpoint);
      // Update request data based on the selected endpoint
      setRequestData(getDefaultRequestData(endpoint, selectedModel));
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = e.target.value;
    setSelectedModel(model);
    updateRequestDataModel(model);
  };

  const updateRequestDataModel = (model: string) => {
    try {
      const data = JSON.parse(requestData);
      data.model = model;
      setRequestData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error updating request data:', error);
    }
  };

  const getDefaultRequestData = (endpoint: typeof API_ENDPOINTS[0], model: string) => {
    switch (endpoint.name) {
      case 'Generate':
        return JSON.stringify({ model, prompt: "Why is the sky blue?" }, null, 2);
      case 'Chat':
        return JSON.stringify({ model, messages: [{ role: "user", content: "Hello!" }] }, null, 2);
      case 'Create Model':
        return JSON.stringify({ name: "my-model", modelfile: "FROM llama2" }, null, 2);
      case 'Show Model Info':
        return JSON.stringify({ name: model }, null, 2);
      case 'Copy Model':
        return JSON.stringify({ source: model, destination: "new-model-name" }, null, 2);
      case 'Delete Model':
        return JSON.stringify({ name: model }, null, 2);
      case 'Pull Model':
        return JSON.stringify({ name: model }, null, 2);
      case 'Push Model':
        return JSON.stringify({ name: model }, null, 2);
      case 'Generate Embeddings':
        return JSON.stringify({ model, prompt: "Hello, world!" }, null, 2);
      default:
        return '{}';
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setResponse(null);
    setActualRequest(null);
    try {
      const parsedData = JSON.parse(requestData);
      const url = `${baseUrl}${selectedEndpoint.endpoint}`;
      const method = selectedEndpoint.method;
      const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };

      if (method !== 'GET') {
        options.body = JSON.stringify({ ...parsedData, stream: streaming });
      }

      setActualRequest({
        url,
        method,
        headers: options.headers,
        body: options.body,
      });

      const res = await fetch(url, options);

      if (streaming && method === 'POST') {
        const reader = res.body?.getReader();
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            lines.forEach(line => {
              try {
                const jsonResponse = JSON.parse(line);
                setResponse(prev => [...(prev || []), jsonResponse]);
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
            });
          }
        }
      } else {
        const jsonResponse = await res.json();
        setResponse(jsonResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'An error occurred while fetching the data.' });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="flex-grow bg-gray-800 text-white p-2 rounded"
          placeholder="Ollama Base URL"
        />
        <button
          onClick={handleBaseUrlChange}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Base URL
        </button>
      </div>
      <div className="flex space-x-4">
        <select
          value={selectedModel}
          onChange={handleModelChange}
          className="bg-gray-800 text-white p-2 rounded"
        >
          {models.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
        <select
          value={selectedEndpoint.endpoint}
          onChange={handleEndpointChange}
          className="bg-gray-800 text-white p-2 rounded"
        >
          {API_ENDPOINTS.map(ep => (
            <option key={ep.endpoint} value={ep.endpoint}>{ep.name}</option>
          ))}
        </select>
        <span className="bg-gray-700 text-white p-2 rounded">
          Method: {selectedEndpoint.method}
        </span>
        {selectedEndpoint.method === 'POST' && (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={streaming}
              onChange={() => setStreaming(!streaming)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Streaming</span>
          </label>
        )}
      </div>
      <textarea
        value={requestData}
        onChange={(e) => setRequestData(e.target.value)}
        className="w-full h-64 bg-gray-800 text-white p-4 rounded"
        placeholder="Enter request data in JSON format"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {isLoading ? 'Loading...' : 'Send Request'}
      </button>
      {actualRequest && (
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Actual Request:</h2>
          <JsonView 
            data={actualRequest} 
            shouldExpandNode={allExpanded} 
            style={darkStyles}
          />
        </div>
      )}
      {response && (
        <div className="bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Response:</h2>
          <JsonView 
            data={response} 
            shouldExpandNode={allExpanded} 
            style={darkStyles}
          />
        </div>
      )}
    </div>
  );
};

export default OllamaApiTester;