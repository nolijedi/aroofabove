import { NextRequest, NextResponse } from 'next/server';
import { track } from '@vercel/analytics';

export async function POST(request: NextRequest) {
  try {
    // Test GoHighLevel API
    const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!ghlResponse.ok) {
      throw new Error(`GoHighLevel API error: ${ghlResponse.statusText}`);
    }

    const ghlData = await ghlResponse.json();

    // Track this API call with Vercel Analytics
    await track('test_integrations', {
      ghlStatus: ghlResponse.status,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      gohighlevel: {
        status: ghlResponse.status,
        data: ghlData
      },
      vercelAnalytics: 'Tracking event sent successfully'
    });

  } catch (error) {
    console.error('Integration test failed:', error);
    
    // Track the error
    await track('test_integrations_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      error: 'Failed to test integrations',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
