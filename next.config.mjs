/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Disable ESLint during builds for both development and production
      ignoreDuringBuilds: true,
    },

    typescript: {
        // Disable type checking during builds
        ignoreBuildErrors: true,
      },
  };
  
  export default nextConfig;
  