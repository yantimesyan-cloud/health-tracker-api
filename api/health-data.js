// /api/health-data endpoint - returns mock health data for a given date
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ error: 'Date parameter required (format: YYYY-MM-DD)' });
  }

  // Generate mock data for the requested date
  const mockData = generateMockData(date);
  
  res.status(200).json(mockData);
}

function generateMockData(date) {
  // Parse date to get day offset for variation
  const dateObj = new Date(date);
  const dayOffset = dateObj.getDate();
  
  // Add some variation based on the day
  const variation = (dayOffset % 10) - 5; // -5 to +4
  
  return {
    date: date,
    score: {
      overall: Math.min(100, Math.max(60, 85 + variation)),
      exercise: Math.min(100, Math.max(60, 90 + variation)),
      nutrition: Math.min(100, Math.max(60, 82 + variation * 0.8)),
      sleep: Math.min(100, Math.max(60, 78 + variation * 1.2))
    },
    steps: {
      current: Math.max(3000, 8234 + variation * 500),
      target: 10000
    },
    calories: {
      intake: Math.max(1200, 1650 + variation * 100),
      target: 2000
    },
    water: {
      current: Math.max(2, 6 + Math.floor(variation * 0.3)),
      target: 8
    },
    weight: {
      current: Math.max(60, 65.5 - dayOffset * 0.05),
      trend: 'down',
      history: generateWeightHistory(65.5 - dayOffset * 0.05)
    },
    bodyFat: {
      current: Math.max(15, 21.2 - dayOffset * 0.03),
      trend: 'down'
    },
    sleep: {
      duration: Math.max(5, 7.5 + variation * 0.2),
      deep: Math.max(1, 2.1 + variation * 0.1),
      light: Math.max(3, 4.2 + variation * 0.15),
      rem: Math.max(0.5, 1.2 + variation * 0.05)
    },
    meals: generateMeals(date),
    activities: generateActivities(date, variation)
  };
}

function generateWeightHistory(currentWeight) {
  const history = [];
  for (let i = 9; i >= 0; i--) {
    history.push(Math.round((currentWeight + i * 0.1) * 10) / 10);
  }
  return history;
}

function generateMeals(date) {
  const meals = [
    { time: '早餐', emoji: '🌅', calories: 420, carbs: 45, protein: 12, fat: 8 },
    { time: '午餐', emoji: '☀️', calories: 680, carbs: 75, protein: 35, fat: 18 },
    { time: '晚餐', emoji: '🌙', calories: 550, carbs: 60, protein: 28, fat: 15 }
  ];
  return meals;
}

function generateActivities(date, variation) {
  const baseActivities = [
    { type: '跑步', duration: 30, calories: 280, icon: '🏃' },
    { type: '瑜伽', duration: 45, calories: 150, icon: '🧘' }
  ];
  
  // Skip activities on some days
  if (variation < -3) {
    return [baseActivities[1]];
  }
  
  return baseActivities;
}
