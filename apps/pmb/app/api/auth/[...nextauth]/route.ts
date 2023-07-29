import NextAuth from 'next-auth';
import { authOptions } from '@uninus/web/modules';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
