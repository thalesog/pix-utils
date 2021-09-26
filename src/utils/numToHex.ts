export default function numToHex(n: number, digits?: number): string {
  const hex = n.toString(16).toUpperCase();
  if (digits) {
    return ('0'.repeat(digits) + hex).slice(-digits);
  }
  return hex.length % 2 === 0 ? hex : '0' + hex;
}
