import { NextApiRequest, NextApiResponse } from 'next'

const GOHIGHLEVEL_API_KEY = process.env.GOHIGHLEVEL_API_KEY
const GOHIGHLEVEL_LOCATION_ID = process.env.GOHIGHLEVEL_LOCATION_ID
const GOHIGHLEVEL_API_URL = 'https://rest.gohighlevel.com/v1/contacts/'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const analyticsData = req.body

    // Transform Vercel analytics data to GoHighLevel format
    const goHighLevelData = {
      email: analyticsData.email || '',
      phone: analyticsData.phone || '',
      customField: {
        pageViews: analyticsData.pageViews,
        timeOnSite: analyticsData.timeOnSite,
        lastVisitedPage: analyticsData.lastPage
      }
    }

    // Send data to GoHighLevel
    const response = await fetch(GOHIGHLEVEL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GOHIGHLEVEL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      body: JSON.stringify(goHighLevelData)
    })

    if (!response.ok) {
      throw new Error('Failed to send data to GoHighLevel')
    }

    return res.status(200).json({ message: 'Analytics data sent to GoHighLevel successfully' })
  } catch (error) {
    console.error('Error processing analytics:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
