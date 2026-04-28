const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function request(path, options = {}) {
  const response = await fetch(path, {
    method: options.method || 'GET',
    headers: { ...JSON_HEADERS, ...(options.headers || {}) },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  cycle: {
    getSummary: () => request('/cycle/summary'),
    getPredictions: () => request('/cycle/predictions'),
    postEvent: (payload) => request('/cycle/events', { method: 'POST', body: payload }),
    postSymptoms: (payload) => request('/symptoms', { method: 'POST', body: payload }),
  },
  nutrition: {
    getTargets: () => request('/nutrition/targets'),
    getDailySummary: () => request('/nutrition/daily-summary'),
    searchFoods: (q) => request(`/foods/search?q=${encodeURIComponent(q)}`),
    createCustomFood: (payload) => request('/foods/custom', { method: 'POST', body: payload }),
    postMealLog: (payload) => request('/meal-logs', { method: 'POST', body: payload }),
    getMealTemplates: () => request('/meal-templates'),
  },
  workouts: {
    getToday: () => request('/workouts/today'),
    start: (payload) => request('/workouts/start', { method: 'POST', body: payload }),
    complete: (payload) => request('/workouts/complete', { method: 'POST', body: payload }),
    skip: (payload) => request('/workouts/skip', { method: 'POST', body: payload }),
    swapExercise: (payload) => request('/workouts/swap-exercise', { method: 'POST', body: payload }),
  },
  privacy: {
    get: () => request('/me/privacy'),
    getConsents: () => request('/me/consents'),
    updateConsents: (payload) => request('/me/consents/update', { method: 'POST', body: payload }),
    exportData: () => request('/me/export', { method: 'POST' }),
    deleteAccount: () => request('/me/account', { method: 'DELETE' }),
  },
  ai: {
    sendMessage: (payload) => request('/ai/chat', { method: 'POST', body: payload }),
  },
};
