function normalizeString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

export function normalizeCity(city: string) {
  return normalizeString(city).substring(0, 15);
}

export function normalizeName(name: string) {
  return normalizeString(name).substring(0, 25);
}
