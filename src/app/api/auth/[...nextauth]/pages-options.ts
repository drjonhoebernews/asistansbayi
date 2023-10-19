import { routes } from '@/config/routes';
import { PagesOptions } from 'next-auth';

export const pagesOptions: Partial<PagesOptions> = {
  signIn: routes.signIn,
  signOut: '/auth/signout',
  error: routes.accessDenied, // Error code passed in query string as ?error=
  verifyRequest: routes.auth.otp1, // (used for check email message)
  newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
};
