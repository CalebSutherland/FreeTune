export function formatKeyName(key: string): string {
  return key.replace(/sharp/g, "♯").replace(/b/g, "♭");
}
