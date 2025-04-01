import { NextRequest, NextResponse } from 'next/server';

// This is similar to @PathVariable in Spring MVC
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;
  
  // Simulate fetching user data from a database
  const userData = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    role: userId === '1' ? 'admin' : 'user',
    createdAt: new Date().toISOString()
  };
  
  return NextResponse.json(userData);
} 