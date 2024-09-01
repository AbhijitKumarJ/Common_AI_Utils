"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Palette, 
  Lightbulb, 
  MessageSquare, 
  Mic, 
  Code, 
  FileText,
  Network,
  Settings
} from "lucide-react";

// Add this type assertion at the beginning of the file
declare global {
  interface Window {
    openRouterApiKey?: string;
    backendAvailable?: boolean;
  }
}

const navigationOptions = [
  { title: "Ollama Manager", href: "/ollama-manager", icon: LayoutDashboard },
  //{ title: "UI Designer", href: "/ui-designer", icon: Palette },
  //{ title: "Task Ideation", href: "/task-ideation", icon: Lightbulb },
  //{ title: "Chat", href: "/chat", icon: MessageSquare },
  //{ title: "Narration", href: "/narration", icon: Mic },
  { title: "Ollama API Tester", href: "/ollama-api-tester", icon: Code },
  { title: "Text Analysis", href: "/text-analysis", icon: FileText },
  { title: "Mind Map Creator", href: "/mind-map", icon: Network }, // New card for Mind Map
];

export default function Home() {
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [persistApiKey, setPersistApiKey] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedApiKey = localStorage.getItem("openRouterApiKey");
      const storedBackendAvailable = localStorage.getItem("backendAvailable");
      if (storedApiKey) setApiKey(storedApiKey);
      if (storedBackendAvailable) setBackendAvailable(storedBackendAvailable === "true");
    }
  }, []);

  const handleSaveSettings = () => {
    if (typeof window !== "undefined") {
      window.openRouterApiKey = apiKey;
      window.backendAvailable = backendAvailable;
      if (persistApiKey) {
        localStorage.setItem("openRouterApiKey", apiKey);
        localStorage.setItem("backendAvailable", String(backendAvailable));
      }
    }
    setShowSettings(false);
  };

  const handleClearSettings = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("openRouterApiKey");
      localStorage.removeItem("backendAvailable");
      setApiKey("");
      setPersistApiKey(false);
      window.openRouterApiKey = "";
      window.backendAvailable = false;
      setBackendAvailable(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="flex justify-center items-center mb-6">
        <span className="mr-2">Backend Server:</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={backendAvailable}
            onChange={(e) => setBackendAvailable(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        {!backendAvailable && (
          <button
            onClick={() => setShowSettings(true)}
            className="ml-2 p-2 rounded-full hover:bg-gray-700"
          >
            <Settings className="h-4 w-4" />
          </button>
        )}
      </div>
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Open Router API Settings</h2>
            <input
              type="text"
              placeholder="Enter Open Router API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-700 rounded"
            />
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="persist"
                checked={persistApiKey}
                onChange={(e) => setPersistApiKey(e.target.checked)}
              />
              <label htmlFor="persist">Persist API Key</label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleClearSettings}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              >
                Clear Settings
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationOptions.map((option) => (
          <Link key={option.href} href={option.href}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors flex items-center">
              <option.icon className="w-8 h-8 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold mb-2">{option.title}</h2>
                <p className="text-gray-400">Navigate to {option.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}