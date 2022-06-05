module.exports = {
    images: {
      domains: ['firebasestorage.googleapis.com','console.firebase.google.com'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:slug*',
          destination: 'http://localhost:5000/api/:slug*',
        },
      ]
    },
  }