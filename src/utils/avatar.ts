// Generates ui-avatars.com URL matching the Armatrix dark theme
export function avatarUrl(name: string): string {
  const encoded = encodeURIComponent(name);
  return (
    `https://ui-avatars.com/api/?name=${encoded}` +
    `&background=1A1A1A&color=E8FF47&size=400&bold=true&font-size=0.33&format=png`
  );
}
