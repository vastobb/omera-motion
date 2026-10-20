package com.omeramotion.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // The bundled editor UI lives under app/src/main/assets/public/index.html
        // (copied from the Vite `dist/` build by the GitHub Action).
    }
}
