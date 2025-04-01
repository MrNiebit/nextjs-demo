"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function ApiDemoPage() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  // Form data demo
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/form-data', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      setResults({ error: 'Failed to submit form' });
    } finally {
      setLoading(false);
    }
  };
  
  // JSON data demo
  const handleJsonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formEl = e.currentTarget;
      const jsonData = {
        title: formEl.title.value,
        description: formEl.description.value,
        tags: formEl.tags.value.split(',').map((tag: string) => tag.trim()),
        priority: parseInt(formEl.priority.value)
      };
      
      const response = await fetch('/api/json-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error submitting JSON:', error);
      setResults({ error: 'Failed to submit JSON data' });
    } finally {
      setLoading(false);
    }
  };
  
  // Path variable demo
  const fetchUserById = async (userId: string) => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setResults({ error: 'Failed to fetch user' });
    } finally {
      setLoading(false);
    }
  };
  
  // Query parameters demo
  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formEl = e.currentTarget;
      const query = formEl.query.value;
      const page = formEl.page.value;
      const limit = formEl.limit.value;
      const sortBy = formEl.sortBy.value;
      
      const url = `/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}&sortBy=${sortBy}`;
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error performing search:', error);
      setResults({ error: 'Failed to perform search' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen p-8">
      <nav className="mb-8">
        <Link href="/" className="nav-link">
          Back to Home
        </Link>
      </nav>
      
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Endpoints Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Data Demo */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Form Data Demo</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="age" className="block mb-1">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  name="age" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Form'}
              </button>
            </form>
          </div>
          
          {/* JSON Data Demo */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">JSON Data Demo</h2>
            <form onSubmit={handleJsonSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block mb-1">Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="description" className="block mb-1">Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                  rows={3}
                  required 
                ></textarea>
              </div>
              <div>
                <label htmlFor="tags" className="block mb-1">Tags (comma-separated)</label>
                <input 
                  type="text" 
                  id="tags" 
                  name="tags" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                  placeholder="tag1, tag2, tag3" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="priority" className="block mb-1">Priority (1-5)</label>
                <input 
                  type="number" 
                  id="priority" 
                  name="priority" 
                  min="1" 
                  max="5" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit JSON'}
              </button>
            </form>
          </div>
          
          {/* Path Variable Demo */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Path Variable Demo</h2>
            <div className="space-y-4">
              <p className="text-sm">Fetch user by ID (similar to @PathVariable)</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => fetchUserById('1')} 
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  disabled={loading}
                >
                  Fetch User 1
                </button>
                <button 
                  onClick={() => fetchUserById('2')} 
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  disabled={loading}
                >
                  Fetch User 2
                </button>
                <button 
                  onClick={() => fetchUserById('3')} 
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  disabled={loading}
                >
                  Fetch User 3
                </button>
              </div>
            </div>
          </div>
          
          {/* Query Parameters Demo */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Query Parameters Demo</h2>
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div>
                <label htmlFor="query" className="block mb-1">Search Query</label>
                <input 
                  type="text" 
                  id="query" 
                  name="query" 
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                  required 
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="page" className="block mb-1">Page</label>
                  <input 
                    type="number" 
                    id="page" 
                    name="page" 
                    defaultValue="1" 
                    min="1" 
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="limit" className="block mb-1">Limit</label>
                  <input 
                    type="number" 
                    id="limit" 
                    name="limit" 
                    defaultValue="10" 
                    min="1" 
                    max="50" 
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="sortBy" className="block mb-1">Sort By</label>
                  <select 
                    id="sortBy" 
                    name="sortBy" 
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" 
                    required
                  >
                    <option value="relevance">Relevance</option>
                    <option value="id">ID</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>
          
          {/* Redirect Demo */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Redirect Demo</h2>
            <div className="space-y-4">
              <p className="text-sm">Click the buttons below to test redirection (opens in new tab)</p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="/api/redirect?target=/page1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Redirect to Page 1
                </a>
                <a 
                  href="/api/redirect?target=/page2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Redirect to Page 2
                </a>
                <a 
                  href="/api/redirect" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Redirect to Home
                </a>
                <a 
                  href="/api/redirect?target=https://nextjs.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Redirect to Next.js
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Display */}
        {results && (
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
} 