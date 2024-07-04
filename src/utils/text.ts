export type ReverseReplace = (value: { ov: any, reg?: RegExp }) => string
export const reverseReplace: ReverseReplace = ({ ov, reg = /[a-zA-Z0-9-]/g }) => {
  if (typeof ov === 'object') {
    return ''
  }
  const arr = `${ov ?? ''}`.match(reg);
  return arr ? arr.join('') : '';
}