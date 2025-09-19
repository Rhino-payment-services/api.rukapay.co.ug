/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.rukapay.co.ug',
    NEXT_PUBLIC_PARTNER_API_BASE_URL: process.env.NEXT_PUBLIC_PARTNER_API_BASE_URL || 'https://api.rukapay.co.ug/partner/v1',
  },
}

module.exports = nextConfig
