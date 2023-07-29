import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function () {
    return;
  },
  {
    callbacks: {
      authorized: (auth) => {
        return !!auth.token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/dashboard',
  ],
};
