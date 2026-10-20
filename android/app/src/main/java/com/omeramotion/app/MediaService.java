package com.omeramotion.app;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

/**
 * Placeholder foreground service so long renders/transcoding initiated from the
 * Termux backend companion can keep the device awake. Wired up minimally so the
 * manifest declares it; the actual media work runs in the Termux backend.
 */
public class MediaService extends Service {
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_NOT_STICKY;
    }
}
