import { NextApiRequest, NextApiResponse } from 'next';
import { track } from '@vercel/analytics';

// Initialize Vercel Analytics

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

    return res.status(200).json({
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

    return res.status(500).json({ 
      error: 'Failed to test integrations',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
