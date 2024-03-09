import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import BigNumber from 'bignumber.js'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatCrypto(price: string | number): string {
  const bigNumberPrice = new BigNumber(price);

  if (!bigNumberPrice.isFinite()) {
    return 'Invalid input';
  }

  if (bigNumberPrice.gte(100)) {
    return bigNumberPrice.integerValue(BigNumber.ROUND_DOWN).toString();
  } else if (bigNumberPrice.gte(10)) {
    return bigNumberPrice.integerValue(BigNumber.ROUND_DOWN).toNumber().toString();
  } else if (bigNumberPrice.gte(0.001)) {
    return bigNumberPrice.toFormat(2, BigNumber.ROUND_DOWN);
  } else if (bigNumberPrice.gte(0.00001)) {
    return bigNumberPrice.toFormat(1, BigNumber.ROUND_DOWN);
  } else if (bigNumberPrice.gte(0.000001)) {
    return bigNumberPrice.toExponential(1);
  } else {
    return 'Invalid input';
  }
}


export function formatNumber(num:number, precision:number = 1) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}