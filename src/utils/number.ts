import { reverseReplace } from "./text";

export const formatValidDecimal = ({
  value,
  dp = 6,
  negative = true,
}: {
  value: string | number;
  dp?: number;
  negative?: boolean
}) => {
  let prev = '';
  const ov = `${value ?? ''}`
  if (negative) {
    if (ov.startsWith('-')) {
      prev = '-';
    }
  }
  if (dp === 0) {
    const v0 = reverseReplace({
      ov,
      reg: /\d/g
    });
    return `${Number(v0)}`;
  }
  const v = reverseReplace({
    ov: ov,
    reg: /\d|[.]?/g
  });
  const [a, ...b] = v.split('.');
  if (!a) {
    return prev
  }
  if (b.length) {
    return `${prev}${a}.${b.join('').slice(0, dp)}`;
  }
  return `${prev}${a}`;
};

export const format2Fixed = ({
  value,
  dp = 2,
}: {
  value: string; dp?: number;
}) => {
  if (dp === 0) {
    return value;
  }
  const v = formatValidDecimal({
    value,
    dp,
  });

  const [a, b] = v.split('.');
  const b1 = `${b ?? ''}`.padEnd(dp, '0');
  return `${a ? a : '0'}.${b1}`;
};

/** 格式化金额千分位 */
export const formatAccount = ({
  value, dp = 2, isShowCNY = false, defaultValue = false, zeroPadding
}: {
  value: any;
  dp?: number;
  isShowCNY?: boolean,
  defaultValue?: boolean;
  zeroPadding?: boolean
}) => {
  const options = {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: zeroPadding ? dp : 0,
    maximumFractionDigits: dp,
  };
  let ov = `${value ?? ''}`
  if (isNaN(Number(value)) || value === '') {
    if (defaultValue) {
      ov = '0'
    } else {
      return value as string
    }
  }
  let formatVal = Number(ov).toLocaleString('zh-CN', options);
  if (!zeroPadding) {
    const [, decimalPart] = ov.split('.')
    const [, formatValDP] = formatVal.split('.')
    if (decimalPart && !formatValDP) {
      formatVal = `${formatVal}.${decimalPart}`
    } else if (ov.includes('.') && !formatVal.includes('.')) {
      formatVal = `${formatVal}.`
    }
  }
  if (isShowCNY) {
    return formatVal;
  }
  if (formatVal.includes('-')) {
    return `-${formatVal.slice(2)}`;
  }
  return formatVal.slice(1);
};