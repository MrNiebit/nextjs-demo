import { NextRequest, NextResponse } from 'next/server';

// This is similar to @RequestParam in Spring MVC
export async function GET(request: NextRequest) {
  // Get URL and search params
  const { searchParams } = new URL(request.url);
  
  // Extract query parameters
  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'relevance';
  
  // Simulate search results
  const results = Array.from({ length: Math.min(limit, 20) }, (_, i) => ({
    id: i + 1 + (page - 1) * limit,
    title: `Result ${i + 1} for "${query}"`,
    description: `This is a search result for query "${query}" on page ${page}`,
    relevance: Math.random() * 100
  }));
  
  // Sort results based on sortBy parameter
  if (sortBy === 'id') {
    results.sort((a, b) => a.id - b.id);
  } else if (sortBy === 'title') {
    results.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    results.sort((a, b) => b.relevance - a.relevance);
  }
  
  return NextResponse.json({
    query,
    page,
    limit,
    sortBy,
    totalResults: 100, // Simulated total
    results
  });
} 