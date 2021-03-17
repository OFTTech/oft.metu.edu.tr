/*const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
    images: {
        domains: ['your.domain']
    }
}

module.exports = withPlugins([[withImages]], nextConfig)*/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
    images: {
        domains: ['blog.metu.edu.tr', 's3.eu-central-1.amazonaws.com'],
    }
}

module.exports = withBundleAnalyzer(nextConfig)
