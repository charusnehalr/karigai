export const seedAdminDemoData = () => ({
  overview: {
    mealLoggingRate: 0.61,
    aiChatUsage: 124,
    safetyFlagsOpen: 5,
    contentAwaitingReview: 11
  },
  queue: [
    {
      id: 'flag-demo-1',
      reason: 'ai_validation_failure',
      status: 'open'
    }
  ]
});
