export function getMemoryUsage() {
  const memoryUsage = process.memoryUsage();

  return {
    rss: `${Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100} MB`,
    heapTotal: `${
      Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100
    } MB`,
    heapUsed: `${
      Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100
    } MB`,
    external: `${
      Math.round((memoryUsage.external / 1024 / 1024) * 100) / 100
    } MB`,
    arrayBuffers: `${
      Math.round((memoryUsage.arrayBuffers / 1024 / 1024) * 100) / 100
    } MB`,
  };
}
