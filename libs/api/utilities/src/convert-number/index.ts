const units = [
  "",
  "ribu",
  "juta",
  "milyar",
  "triliun",
  "quadriliun",
  "quintiliun",
  "sextiliun",
  "septiliun",
  "oktiliun",
  "noniliun",
  "desiliun",
  "undesiliun",
  "duodesiliun",
  "tredesiliun",
  "quattuordesiliun",
  "quindesiliun",
  "sexdesiliun",
  "septendesiliun",
  "oktodesiliun",
  "novemdesiliun",
  "vigintiliun",
];
const numbers = [
  "",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
];
const maxIndex = units.length - 1;
const digitToUnit = (digit: number) => {
  const curIndex = digit / 3;
  return curIndex <= maxIndex ? units[curIndex] : units[maxIndex];
};

const numberToText = (index: number) => {
  return numbers[index] || "";
};

export const convertNumberToWords = (target: string) => {
  const angkaLength = target.length;
  const angkaMaxIndex = angkaLength - 1;

  if (angkaMaxIndex === 0 && Number(target[0]) === 0) {
    return "nol";
  }

  let space = "";
  let result = "";

  let i = 0;
  while (i !== angkaLength) {
    const digitCount = angkaMaxIndex - i;
    const modGroup = digitCount % 3;
    const curAngka = Number(target[i]);

    if (
      digitCount === 3 &&
      curAngka === 1 &&
      (i === 0 || (Number(target[i - 2]) === 0 && Number(target[i - 1]) === 0))
    ) {
      result += `${space}seribu`;
    } else {
      if (curAngka !== 0) {
        if (modGroup === 0) {
          result += `${space}${numberToText(curAngka)}${
            i === angkaMaxIndex ? "" : " "
          }${digitToUnit(digitCount)}`;
        } else if (modGroup === 2) {
          if (curAngka === 1) {
            result += `${space}seratus`;
          } else {
            result += `${space}${numberToText(curAngka)} ratus`;
          }
        } else {
          if (curAngka === 1) {
            i++;
            const nextAngka = Number(target[i]);
            if (nextAngka === 0) {
              result += `${space}sepuluh`;

              if (
                digitCount !== 1 &&
                (Number(target[i - 2]) !== 0 || Number(target[i - 1]) !== 0)
              ) {
                result += ` ${digitToUnit(digitCount - 1)}`;
              }
            } else {
              if (nextAngka === 1) {
                result += `${space}sebelas`;
              } else {
                result += `${space}${numberToText(nextAngka)} belas`;
              }

              if (digitCount !== 1) {
                result += ` ${digitToUnit(digitCount - 1)}`;
              }
            }
          } else {
            result += `${space}${numberToText(curAngka)} puluh`;
          }
        }
      } else {
        if (
          modGroup === 0 &&
          (Number(target[i - 2]) !== 0 || Number(target[i - 1]) !== 0) &&
          digitCount !== 0
        ) {
          result += ` ${digitToUnit(digitCount)}`;
        }
      }
    }

    if (i <= 1) {
      space = " ";
    }
    i++;
  }

  return result + " rupiah";
};
