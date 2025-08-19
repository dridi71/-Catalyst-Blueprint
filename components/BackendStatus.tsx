
import React, { useState, useEffect } from 'react';
import { ServerIcon } from './icons/ServerIcon';

// Define a type for the data expected from the API
interface Item {
  id: number;
  name: string;
  framework: string;
}

type Status = 'loading' | 'success' | 'error';

export const BackendStatus: React.FC = () => {
  const [data, setData] = useState<Item[] | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from a Python API
    const timer = setTimeout(() => {
      // Simulate a potential error
      if (Math.random() < 0.1) { // 10% chance of error
        setError('401 Unauthorized: Invalid API Key');
        setStatus('error');
      } else {
        const mockData: Item[] = [
          { id: 1, name: "Frontend Framework", framework: "React/TS" },
          { id: 2, name: "Backend Framework", framework: "FastAPI" },
        ];
        setData(mockData);
        setStatus('success');
      }
    }, 1500); // 1.5 second delay to simulate network latency

    return () => clearTimeout(timer);
  }, []); // The empty array means this effect runs only once on mount

  const statusIndicatorClasses: { [key in Status]: string } = {
    loading: 'bg-yellow-500 animate-pulse',
    success: 'bg-green-500',
    error: 'bg-red-500',
  };
  
  const statusText: { [key in Status]: string } = {
    loading: 'Connecting (Auth Required)...',
    success: 'Connected (Authorized)',
    error: 'Connection Failed',
  };

  return (
    <div className="p-3 bg-slate-800 rounded-md">
      <div className="flex items-center mb-3">
        <ServerIcon className="w-5 h-5 mr-2 text-slate-400" />
        <h3 className="font-semibold text-slate-300">Backend Status</h3>
      </div>
      <div className="text-sm">
        <div className="flex items-center mb-2">
            <div className={`w-2.5 h-2.5 rounded-full mr-2 ${statusIndicatorClasses[status]}`}></div>
            <p className="text-slate-400">{statusText[status]}</p>
        </div>

        {status === 'success' && data && (
          <div className="text-xs text-slate-500 pl-4 border-l-2 border-slate-700 ml-1 py-1 space-y-4">
            <div>
                 <p><strong>Endpoint:</strong> <code className="text-xs bg-slate-700 px-1 py-0.5 rounded-sm">GET /api/items</code></p>
                 <div className="mt-2">
                    <label className="font-bold text-slate-400">Request Header:</label>
                    <div className="flex items-center mt-1 p-1 bg-slate-700 border border-slate-600 rounded-sm">
                        <span className="text-slate-400 mr-2">X-API-Key:</span>
                        <input type="text" value="••••••••••••••••••••SECRET" className="flex-1 text-xs bg-transparent placeholder-slate-500 outline-none" disabled/>
                    </div>
                </div>
                <p className="font-bold text-slate-400 mt-2">Items Fetched:</p>
                <ul className="space-y-1 mt-1">
                {data.map(item => (
                    <li key={item.id} className="text-slate-500">
                    <span className="text-cyan-500">({item.id})</span> {item.name}: <span className="font-semibold">{item.framework}</span>
                    </li>
                ))}
                </ul>
            </div>
          </div>
        )}
        {status === 'error' && (
             <p className="text-xs text-red-400 pl-4">{error}</p>
        )}
      </div>
    </div>
  );
};