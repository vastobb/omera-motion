import { defineCapacitorConfig } from '@capacitor/cli';

export default defineCapacitorConfig({
  appId: 'com.omeramotion.app',
  appName: 'omera motion',
  webDir: 'dist',
  bundledWebRuntime: false,
  // The editor UI (Vite build) is bundled into the APK under `dist/`.
  // Video processing / AI (ffmpeg, onnxruntime) runs in the Termux backend
  // companion on the same device; point this at its URL:
  //   dev:  http://<termux-device-ip>:4173  (or the run.sh printed URL)
  //   prod: http://<termux-device-ip>:PORT
  // For a fully offline/local UI, leave server.url unset (loads bundled dist).
  server: {
    url: undefined,
    cleartext: true,
    allowNavigation: ['http://localhost*', 'http://127.0.0.1*', 'http://192.168.*', 'http://10.*'],
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      backgroundColor: '#0b0c10',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0b0c10',
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
    },
  },
});
