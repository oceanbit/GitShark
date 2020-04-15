package com.gitshark;

import com.facebook.react.ReactActivity;

import android.graphics.Color;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.os.Build;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "GitShark";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Window w = getWindow();
        boolean isDarkMode = false;
        int translucentLightColor = Color.parseColor("#50000000");
        int translucentDarkColor = Color.TRANSPARENT;

        // Set the navbar to be drawn over
        // Both flags were added in Level 16
        int flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION

        // M was the first version that supported light mode status bar
        boolean shouldTranslucizeStatusBar = Build.VERSION.SDK_INT <= Build.VERSION_CODES.M;
        // O was the first version that supported light mode nav bar
        boolean shouldTranslucizeNavBar = Build.VERSION.SDK_INT <= Build.VERSION_CODES.O;

        if (shouldTranslucizeStatusBar) {
            w.setStatusBarColor(isDarkMode ? translucentLightColor : translucentDarkColor);
        } else {
            w.setStatusBarColor(Color.TRANSPARENT);
            if (!isDarkMode) {
                flags |= View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            }
        }

        if (shouldTranslucizeNavBar) {
            w.setNavigationBarColor(isDarkMode ? translucentLightColor : translucentDarkColor);
        } else {
            w.setNavigationBarColor(Color.TRANSPARENT);
            if (!isDarkMode) {
                flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
            }
        }

        w.getDecorView().setSystemUiVisibility(flags);

        super.onCreate(savedInstanceState);
    }
}
