import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Add CORS headers
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  })

  try {
    // Test GoHighLevel API connection
    const goHighLevelTest = await testGoHighLevelConnection()
    
    // Test Vercel Analytics (this will show up in your Vercel Analytics dashboard)
    const analyticsTest = {
      timestamp: new Date().toISOString(),
      test: 'integration_test'
    }

    return new NextResponse(
      JSON.stringify({
        gohighlevel: goHighLevelTest,
        analytics: analyticsTest,
        message: 'Integration test completed'
      }),
      {
        status: 200,
        headers
      }
    )
  } catch (error) {
    console.error('Integration test failed:', error)
    return new NextResponse(
      JSON.stringify({ 
        error: 'Integration test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers
      }
    )
  }
}

async function testGoHighLevelConnection() {
  const GOHIGHLEVEL_API_KEY = process.env.GOHIGHLEVEL_API_KEY
  const GOHIGHLEVEL_API_URL = 'https://rest.gohighlevel.com/v1/contacts/'

  if (!GOHIGHLEVEL_API_KEY) {
    throw new Error('GoHighLevel API key not configured')
  }

  const response = await fetch(GOHIGHLEVEL_API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${GOHIGHLEVEL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    }
  })

  if (!response.ok) {
    throw new Error(`GoHighLevel API test failed: ${response.statusText}`)
  }

  return {
    status: 'connected',
    timestamp: new Date().toISOString()
  }
}
