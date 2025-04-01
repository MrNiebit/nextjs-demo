import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse JSON data from request body
    const jsonData = await request.json();
    
    // Process the data
    const response = {
      success: true,
      message: 'JSON data received successfully',
      data: {
        ...jsonData,
        receivedAt: new Date().toISOString()
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Invalid JSON data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 400 }
    );
  }
} 