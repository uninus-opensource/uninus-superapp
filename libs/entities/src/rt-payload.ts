import { TJwtPayload } from '.';

export type TRefreshTokenPayload = TJwtPayload & { refreshToken: string };