import react from '@vitejs/plugin-react'

export default {
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://server-dev:3000',
                changeOrigin: true,
            }
        }
    }
}
