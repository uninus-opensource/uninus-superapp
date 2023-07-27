import NextAuth from 'next-auth';
import { authOptionsAdmin } from '@uninus/modules-fe';

const handler = NextAuth(authOptionsAdmin);
export { handler as GET, handler as POST };
