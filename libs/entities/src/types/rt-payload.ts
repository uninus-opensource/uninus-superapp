import { TJwtPayload } from './jwt.payload';

export type TRefreshTokenPayload = TJwtPayload & { refreshToken: string };
