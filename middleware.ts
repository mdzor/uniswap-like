export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/explorer', '/swap', '/app/:path*', '/other/:path*', '/help/:path*'],
  pages: {
    signIn: '/explorer',
    error: '/signin',
  }
}