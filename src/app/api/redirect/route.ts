import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the target URL from query parameters
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');
  
  // If target is provided, redirect to that URL
  if (target) {
    // This is similar to redirecting in Spring MVC
    return NextResponse.redirect(new URL(target, request.url));
  }
  
  // If no target is provided, redirect to the home page
  return NextResponse.redirect(new URL('/', request.url));
} 