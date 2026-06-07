const compactFormatter = new Intl.NumberFormat(undefined, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export function formatCompact(value: number): string {
  return compactFormatter.format(value);
}
