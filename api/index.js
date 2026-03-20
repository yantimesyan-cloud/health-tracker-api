// Root endpoint - API status and documentation
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    status: 'ok',
    message: 'Health Tracker API',
    version: '1.0.0',
    endpoints: {
      '/api/health-data': {
        method: 'GET',
        description: 'Get health data for a specific date',
        parameters: {
          date: 'Date in YYYY-MM-DD format (required)'
        },
        example: '/api/health-data?date=2024-03-20'
      }
    },
    docs: 'https://github.com/yantimesyan-cloud/health-tracker-api'
  });
}
