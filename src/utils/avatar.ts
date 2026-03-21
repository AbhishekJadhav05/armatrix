// Generates a doodled cat avatar using Robohash
export function avatarUrl(name: string): string {
  const encoded = encodeURIComponent(name);
  return `https://robohash.org/${encoded}?set=set4&bgset=bg2&size=400x400`;
}
