import * as CryptoJS from "crypto-js";

export const createSignature = (data: string, timestamp: number, secret: string) =>
  hashing(secret, `${signReplaceAll(data)}&${timestamp}&${secret}`);

const sortObject = (data: Record<string, unknown>) => {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  return Object.keys(data)
    .sort()
    .reduce((accumulator: Record<string, unknown>, key: string) => {
      accumulator[key] = sortObject(data[key] as Record<string, unknown>);
      return accumulator;
    }, {});
};

const signReplaceAll = (data: string) =>
  JSON.stringify(sortObject(JSON.parse(data)))
    .replace(/[^a-zA-Z0-9{}:.,]/g, "")
    .toLowerCase();

const hashing = (secret: string, data: string) =>
  CryptoJS.HmacSHA512(data, secret).toString(CryptoJS.enc.Hex);
