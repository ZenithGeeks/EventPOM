import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing-page',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
                pathname: "/**",
      },
       {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
        
      },
         {
        protocol: "http",
        hostname: "localhost",
        port: "9001",
        pathname: "/**",
        
      },
        {
        protocol: "https",
        hostname: "storage.googleapis.com",
                pathname: "/**",
        }
    ],
  },
};//add localhost protocal *http***

export default nextConfig;
