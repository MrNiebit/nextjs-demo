import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Parse form data
  const formData = await request.formData();
  
  // Extract values from form data
  const name = formData.get('name');
  const email = formData.get('email');
  const age = formData.get('age');
  
  // Process the data
  const response = {
    success: true,
    message: 'Form data received successfully',
    data: {
      name,
      email,
      age: age ? Number(age) : null,
      receivedAt: new Date().toISOString()
    }
  };
  
  return NextResponse.json(response);
} 