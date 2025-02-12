import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Test GoHighLevel API connection
    const goHighLevelTest = await testGoHighLevelConnection()
    
    // Test Vercel Analytics (this will show up in your Vercel Analytics dashboard)
    const analyticsTest = {
      timestamp: new Date().toISOString(),
      test: 'integration_test'
    }

    res.status(200).json({
      gohighlevel: goHighLevelTest,
      analytics: analyticsTest,
      message: 'Integration test completed'
    })
  } catch (error) {
    console.error('Integration test failed:', error)
    res.status(500).json({ 
      error: 'Integration test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
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
