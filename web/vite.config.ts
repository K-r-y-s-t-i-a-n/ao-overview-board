import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugin: Partial<VitePWAOptions> = {
  // registerType: 'autoUpdate',
  registerType: 'prompt',
  devOptions: {
    enabled: true,
  },
  // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  workbox: {
    globPatterns: ['**/*'],
  },
  // add this to cache all the
  // static assets in the public folder
  includeAssets: ['**/*'],
  manifest: {
    name: 'Overview Board',
    short_name: 'AOL',
    description: 'An app for Airways Optical employees.',
    icons: [
      // {
      //   src: 'pwa-64x64.png',
      //   sizes: '64x64',
      //   type: 'image/png',
      // },
      {
        // ok
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        // ok
        src: '/android-chrome-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        // ok
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        // purpose: 'apple touch icon',
      },
      // {
      //   src: '/maskable_icon.png',
      //   sizes: '225x225',
      //   type: 'image/png',
      //   purpose: 'any maskable',
      // },
      // {
      //   src: 'pwa-512x512.png',
      //   sizes: '512x512',
      //   type: 'image/png',
      //   purpose: 'any',
      // },
      {
        // ok
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
