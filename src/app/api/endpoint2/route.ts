import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate data fetching or processing
  const data = {
    id: 2,
    name: 'API Endpoint 2',
    description: 'This is data from the second API endpoint',
    timestamp: new Date().toISOString(),
    stats: {
      visits: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 100)
    }
  };

  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(data);
} 