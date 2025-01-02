/**
 * 1000 -> 1,000
 * @param str
 * @param showZeroInsteadOfNull
 * @returns
 */
export const formatNumber = (
  str: number | string | null | undefined,
  showZeroInsteadOfNull = false,
): string => {
  if (showZeroInsteadOfNull && str == null) str = '0';
  if (typeof str !== 'number' && (!str || isNaN(Number(str)))) return '';
  if (typeof str === 'number') {
    str = Math.floor(str);
  }
  const num = Number(str);

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
