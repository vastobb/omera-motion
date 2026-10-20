/**
 * Standalone entry point for running the OpenChatCut (omera motion) editor
 * stack outside of Electron, e.g. inside Termux on Android.
 *
 * It boots the same embedded production server used by the desktop app so the
 * bundled web UI (dist/) and the Node.js backend (ffmpeg, onnxruntime, agents,
 * exports) share one origin. The Android APK (WebView) points at this server's
 * origin over the device network.
 *
 * Usage (Termux):
 *   pkg install nodejs ffmpeg
 *   npm ci
 *   npm run build
 *   npx tsx server/standalone.ts
 */
import { startEmbeddedServer } from './desktop/embedded-server.ts';
import { resolve } from 'node:path';

async function main() {
  const distDir = resolve(process.cwd(), 'dist');
  const { port, origin } = await startEmbeddedServer(distDir);
  // eslint-disable-next-line no-console
  console.log(`[omera motion] backend listening on ${origin}`);
  // eslint-disable-next-line no-console
  console.log('[omera motion] point the Android APK at: ' + origin);
  process.stdout.write('READY\n');
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[omera motion] backend failed to start:', err);
  process.exit(1);
});
