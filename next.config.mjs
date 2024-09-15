/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Disable ESLint only in developmentn
      ignoreDuringBuilds: process.env.NODE_ENV === 'development'
    },
  };
  
  export default nextConfig;
  