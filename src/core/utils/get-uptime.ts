export function getUptime() {
  return `${Math.floor(process.uptime() / 86400)}d ${Math.floor(
    (process.uptime() % 86400) / 3600,
  )}h ${Math.floor(((process.uptime() % 86400) % 3600) / 60)}m ${Math.floor(
    ((process.uptime() % 86400) % 3600) % 60,
  )}s`;
}
