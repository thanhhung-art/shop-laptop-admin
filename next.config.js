module.exports = {
    images: {
      domains: ['firebasestorage.googleapis.com','console.firebase.google.com'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:slug*',
          destination: 'https://shop-laptop-server.vercel.app/api/:slug*',
        },
      ]
    },
  }