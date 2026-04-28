import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@karigai.app' },
    update: {},
    create: {
      email: 'demo@karigai.app',
      passwordHash: 'dev-hash',
      profile: { create: { name: 'Demo User', country: 'US', unitSystem: 'metric' } }
    }
  });

  await prisma.goal.create({ data: { userId: user.id, goalType: 'lose_weight', timelineWeeks: 16, targetValue: '68kg' } });
  await prisma.nutritionTarget.create({ data: { userId: user.id, calories: 1800, proteinG: 110, fatsG: 55, carbsG: 190 } });
  await prisma.bodyMeasurement.create({ data: { userId: user.id, waistCm: 82, hipCm: 98, weightKg: 74 } });

  console.log('Seeded demo data for', user.email);
}

main().finally(async () => prisma.$disconnect());
