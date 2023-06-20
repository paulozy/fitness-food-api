import { PrismaService } from '@core/infra/database/prisma/prisma.service';

export async function checkDatabaseHealthy(
  prisma: PrismaService,
): Promise<string> {
  const trueOrFalse = new Promise((resolve, reject) => {
    prisma
      .$connect()
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      })
      .finally(() => {
        prisma.$disconnect();
      });
  });

  const database = await trueOrFalse;

  const message = database ? 'Healthy' : 'Unhealthy';

  return message;
}
