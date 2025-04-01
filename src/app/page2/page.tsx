"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page2() {
  return (
    <div className="min-h-screen p-8">
      <nav className="mb-8">
        <Link href="/" className="nav-link">
          Back to Home
        </Link>
      </nav>
      
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Page 2</h1>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Data from API 2</h2>
          <ClientComponent />
        </div>
      </main>
    </div>
  );
}

// Client component to fetch data
function ClientComponent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/endpoint2');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  
  return (
    <div>
      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
} 