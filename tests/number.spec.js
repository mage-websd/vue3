import { expect, test } from 'vitest'
import { formatNumber } from '../src/helpers/number';

test('formatNumber 1000 -> 1,000', () => {
  expect(formatNumber(1000)).toBe('1,000');
});
