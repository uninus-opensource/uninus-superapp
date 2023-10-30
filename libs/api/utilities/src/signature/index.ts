import * as crypto from "crypto";

export const createSignature = (data: string, timeStamp: number, apiKey: string): string =>
  hashing(apiKey, `${signReplaceAll(data)}&${timeStamp}&${apiKey}`);

const signReplaceAll = (data: string) => data.replace(/[^a-zA-Z0-9{}:.,]/g, "").toLowerCase();

const hashing = (secret: string, data: string): string =>
  crypto.createHmac("sha512", Buffer.from(secret)).update(data).digest("hex");
