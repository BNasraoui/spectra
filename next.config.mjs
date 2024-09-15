/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Disable ESLint during builds for both development and production
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  