import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate data fetching or processing
  const data = {
    id: 1,
    name: 'API Endpoint 1',
    apiKey: process.env.API_KEY,
    description: 'This is data from the first API endpoint',
    timestamp: new Date().toISOString(),
    items: [
      { id: 101, value: 'Item 1' },
      { id: 102, value: 'Item 2' },
      { id: 103, value: 'Item 3' }
    ]
  };

  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(data);
} 