import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
   reactCompiler: true,
  images: {
   remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '7187', // البورت اللي ظاهر معاك في الإيرور
        pathname: '/**',
      },
      {
        protocol: 'http', // ضفت الـ http كمان احتياطي عشان لو الباك إيند شغال عليه
        hostname: 'localhost',
        port: '5123', // ده بورت تاني كان ظاهر في الأكواد بتاعتك قبل كده
        pathname: '/**',
      },{
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dintify.runasp.net',
        port: '',
        pathname: '/**', 
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", 
    },
  },
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: 'http://localhost:5123/api/:path*', 
      },
    ];
  },
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

// export default nextConfig;
