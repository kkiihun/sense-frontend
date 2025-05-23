/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/records',
        destination: 'http://192.168.1.143:8000/records',
      },
    ];
  },
};

module.exports = nextConfig;
