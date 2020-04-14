package com.gitshark;

import com.facebook.react.ReactActivity;

import android.graphics.Color;
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

      // FLAG_LAYOUT_NO_LIMITS - Window flag: allow window to extend outside of the screen.
      w.setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);

      super.onCreate(savedInstanceState);
  }
}
