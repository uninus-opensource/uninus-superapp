import NextAuth from 'next-auth';
import { authOptions } from '@uninus/modules-fe';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
