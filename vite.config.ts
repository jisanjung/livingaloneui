import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Opens the connection (DNS + TLS) to the API while the JS bundle is still
// downloading, so the first request (the balance) skips that setup time.
const preconnectApi = (apiBasePath?: string): Plugin => ({
  name: 'preconnect-api',
  transformIndexHtml() {
    if (!apiBasePath) {
      return [];
    }
    // Only the origin matters for a preconnect (scheme + host + port).
    const origin = apiBasePath.match(/^https?:\/\/[^/]+/i)?.[0];
    if (!origin) {
      return [];
    }
    return [{
      tag: 'link',
      attrs: { rel: 'preconnect', href: origin, crossorigin: '' },
      injectTo: 'head',
    }];
  },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');
  return {
    plugins: [react(), preconnectApi(env.VITE_LIVING_ALONE_API_BASE_PATH)],
  };
})
