import * as crypto from "crypto";

export const hashing = (payload: string): string =>
  crypto.createHash("sha512").update(payload).digest("hex");
