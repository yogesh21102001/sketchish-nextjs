/** @type {import('next').NextConfig} */
const nextConfig = {
    images: { unoptimized: true }, trailingSlash: true, output: 'export', env: {
        NEXT_BASE_URL: process.env.NEXT_BASE_URL,
    }
}

module.exports = nextConfig

