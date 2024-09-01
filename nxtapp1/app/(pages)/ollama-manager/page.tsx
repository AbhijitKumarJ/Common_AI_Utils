'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface OllamaModel {
  name: string;
  size: string;
  details?: any; // Added this line to fix the TypeScript error
}

const hardcodedModels = [
  "llama2",
  "codellama",
  "mistral",
  "dolphin-mixtral",
  "phi",
  "llama2-uncensored",
  "deepseek-coder",
  "zephyr",
  "orca-mini",
  "vicuna",
  "stable-beluga",
  "neural-chat",
  "starling-lm",
  "wizardlm",
  "openhermes",
  "wizard-vicuna",
  "falcon",
  "starcoder",
  "wizardcoder",
  "sqlcoder",
  "stablelm-zephyr",
  "nous-hermes",
  "openchat",
  "orca",
  "llama2-chinese",
  "codeup",
  "everythinglm",
  "phind-codellama",
  "yarn-llama",
  "meditron",
  "llama-pro",
  "medllama2",
  "wizardlm-uncensored",
  "magicoder",
  "mistrallite",
  "samantha-mistral",
  "dolphin-phi",
  "nexusraven",
  "openorca-platypus2",
  "yi",
  "wizard-math",
  "notus",
  "rift-coder",
  "falcon2",
  "xwinlm",
  "deepseek-llm",
  "tinyllama",
  "notux",
  "stable-code",
  "llama2-70b-stealth",
];

export default function OllamaManager() {
  const [ollamaUrl, setOllamaUrl] = useState('http://localhost:11434');
  const [models, setModels] = useState<OllamaModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<OllamaModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [testPrompt, setTestPrompt] = useState('Hello, how are you?');
  const [testResponse, setTestResponse] = useState('');
  const [showTestPopup, setShowTestPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editModelPresets, setEditModelPresets] = useState('');
  const [showPullPopup, setShowPullPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [pullProgress, setPullProgress] = useState('');
  const [isPulling, setIsPulling] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [modelInput, setModelInput] = useState('');
  const [filteredModels, setFilteredModels] = useState<string[]>([]);

  useEffect(() => {
    fetchModels();
  }, [ollamaUrl]);

  const fetchModels = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`${ollamaUrl}/api/tags`);
      setModels(response.data.models);
    } catch (err) {
      setError('Failed to fetch models');
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOllamaUrl(e.target.value);
  };

  const handleModelDetails = async (model: OllamaModel) => {
    setSelectedModel(model);
    try {
      const response = await axios.post(`${ollamaUrl}/api/show`, { name: model.name });
      setSelectedModel({ ...model, details: response.data });
    } catch (err) {
      setError('Failed to fetch model details');
      console.error(err);
    }
  };

  const handleDeleteModel = async (modelName: string) => {
    if (window.confirm(`Are you sure you want to delete ${modelName}?`)) {
      try {
        await axios.delete(`${ollamaUrl}/api/delete`, { data: { name: modelName } });
        fetchModels();
      } catch (err) {
        setError('Failed to delete model');
        console.error(err);
      }
    }
  };

  const handleEditModel = async (model: OllamaModel) => {
    setShowEditPopup(true);
    setSelectedModel(model);
    try {
      const response = await axios.post(`${ollamaUrl}/api/show`, { name: model.name });
      setEditModelPresets(JSON.stringify(response.data, null, 2));
    } catch (err) {
      setError('Failed to fetch model details');
      console.error(err);
    }
  };

  const handleSaveModelPresets = async () => {
    try {
      const presets = JSON.parse(editModelPresets);
      await axios.post(`${ollamaUrl}/api/create`, presets);
      setShowEditPopup(false);
      fetchModels();
    } catch (err) {
      setError('Failed to save model presets');
      console.error(err);
    }
  };

  const handleTestModel = async (modelName: string) => {
    setShowTestPopup(true);
    setSelectedModel({ name: modelName, size: '' });
  };

  const handleSendTest = async () => {
    setTestResponse('');
    try {
      const response = await axios.post(`${ollamaUrl}/api/generate`, {
        model: selectedModel?.name,
        prompt: testPrompt,
        stream: false
      });
      setTestResponse(JSON.stringify(response.data, null, 2));
    } catch (err) {
      setTestResponse(JSON.stringify(err, null, 2));
    }
  };

  const handlePullModel = () => {
    setShowPullPopup(true);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${ollamaUrl}/api/tags?query=${searchQuery}`);
      setSearchResults(response.data.models.map((model: OllamaModel) => model.name));
    } catch (err) {
      setError('Failed to search models');
      console.error(err);
    }
  };

  const handlePull = async (modelName: string) => {
    setIsPulling(true);
    setPullProgress('');
    abortControllerRef.current = new AbortController();

    try {
      const response = await axios.post(
        `${ollamaUrl}/api/pull`,
        { name: modelName },
        {
          signal: abortControllerRef.current.signal,
          onDownloadProgress: (progressEvent) => {
            const progress = progressEvent.event.target.responseText;
            setPullProgress(progress);
          },
        }
      );
      console.log('Pull completed:', response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Pull cancelled');
      } else {
        setError('Failed to pull model');
        console.error(err);
      }
    } finally {
      setIsPulling(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelPull = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleModelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setModelInput(input);
    setFilteredModels(
      hardcodedModels.filter(model => model.toLowerCase().includes(input.toLowerCase()))
    );
  };

  const handleModelSelect = (model: string) => {
    setModelInput(model);
    setFilteredModels([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ollama Manager</h1>
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Return to Dashboard
          </button>
        </Link>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          value={ollamaUrl}
          onChange={handleUrlChange}
          className="bg-gray-800 text-white p-2 rounded"
        />
        <button
          onClick={fetchModels}
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update URL
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <div key={model.name} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{model.name}</h2>
            <p>Size: {model.size}</p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => handleModelDetails(model)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              >
                Details
              </button>
              <button
                onClick={() => handleDeleteModel(model.name)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditModel(model)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleTestModel(model.name)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
              >
                Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-2">{selectedModel.name} Details</h2>
            <pre className="bg-gray-700 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(selectedModel.details, null, 2)}
            </pre>
            <button
              onClick={() => setSelectedModel(null)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showTestPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-2">Test {selectedModel?.name}</h2>
            <textarea
              value={testPrompt}
              onChange={(e) => setTestPrompt(e.target.value)}
              className="w-full h-32 bg-gray-700 text-white p-2 rounded mb-4"
            />
            <button
              onClick={handleSendTest}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
              Send Test
            </button>
            <pre className="bg-gray-700 p-4 rounded overflow-auto max-h-96">
              {testResponse}
            </pre>
            <button
              onClick={() => setShowTestPopup(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-2">Edit {selectedModel?.name} Presets</h2>
            <textarea
              value={editModelPresets}
              onChange={(e) => setEditModelPresets(e.target.value)}
              className="w-full h-96 bg-gray-700 text-white p-2 rounded mb-4"
            />
            <button
              onClick={handleSaveModelPresets}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setShowEditPopup(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handlePullModel}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
        Pull Model
      </button>

      {showPullPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-2">Pull Ollama Model</h2>
            <div className="relative mb-4">
              <input
                type="text"
                value={modelInput}
                onChange={handleModelInputChange}
                className="w-full p-2 bg-gray-700 text-white rounded"
                placeholder="Enter or select a model name..."
              />
              {filteredModels.length > 0 && (
                <ul className="absolute z-10 w-full bg-gray-700 mt-1 rounded max-h-48 overflow-y-auto">
                  {filteredModels.map((model) => (
                    <li
                      key={model}
                      className="p-2 hover:bg-gray-600 cursor-pointer"
                      onClick={() => handleModelSelect(model)}
                    >
                      {model}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={() => handlePull(modelInput)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              disabled={isPulling || !modelInput.trim()}
            >
              Pull Model
            </button>
            <button
              onClick={() => setShowPullPopup(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            {isPulling && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">Pull Progress:</h3>
                <pre className="bg-gray-700 p-2 rounded mb-2 max-h-32 overflow-y-auto">
                  {pullProgress}
                </pre>
                <button
                  onClick={handleCancelPull}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Cancel Pull
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}