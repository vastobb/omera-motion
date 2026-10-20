# omera motion — Termux backend

The OpenChatCut editor is an Electron desktop app with a Node.js backend and
native media modules (ffmpeg, onnxruntime, Remotion rendering). Those native
modules cannot run inside an Android WebView APK, so the editor runs as a **split
wrapper** on Android:

| Part | Runs where |
|------|------------|
| Editor UI (React + Vite) | Inside the `omera motion` APK (WebView) |
| Backend / media processing | Termux on the same device (`termux-backend/run.sh`) |

The APK talks to the Termux backend over the device network (`http://<ip>:PORT`).

## Quick start (Termux)

```sh
termux-setup-storage
git clone https://github.com/<your-user>/omera-motion.git
cd omera-motion
bash termux-backend/run.sh
```

`run.sh` installs `nodejs` + `ffmpeg`, runs `npm ci`, builds the web UI, and
starts the embedded server. It prints the origin URL — point the APK at that
URL (set `capacitor.config.ts` `server.url` and rebuild, or navigate the
WebView to it manually).

## Caveats

- Native modules (`onnxruntime-node`, `ffmpeg-static`) compile against Termux's
  aarch64 Android toolchain; some prebuilt binaries may not exist and will fall
  back to source builds, which are slow. If a module fails, the corresponding
  AI/media feature is degraded but the timeline editor UI still works.
- For a fully offline, single-APK build with native media inside the APK, you'd
  need to compile ffmpeg/onnxruntime for the Android NDK — that's beyond the
  1:1 wrapper scope and is why the Termux backend companion is provided.
