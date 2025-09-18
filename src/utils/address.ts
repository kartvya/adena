export function shortAddress(addr: string): string {
  if (!addr) return '';
  return addr.slice(0, 4) + addr.slice(4, 6) + '...' + addr.slice(-4);
}
