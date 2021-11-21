package dev.oceanbit.gitshark;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.nbsp.materialfilepicker.MaterialFilePicker;
import com.nbsp.materialfilepicker.ui.FilePickerActivity;

import java.util.regex.Pattern;

public class DirectoryPickerModule extends ReactContextBaseJavaModule {

    public static final int PERMISSIONS_REQUEST_CODE = 0;

    private Callback onDone;
    private Callback onCancel;

    public DirectoryPickerModule(ReactApplicationContext reactContext) {
        super(reactContext);

        getReactApplicationContext().addActivityEventListener(new ActivityEventListener());
    }

    @Override
    public String getName() {
        return "DirectoryPickerModule";
    }

    @ReactMethod
    public void Show(final ReadableMap props, final Callback onDone, final Callback onCancel) {
        boolean openFilePicker = checkPermissionsAndOpenFilePicker();
        if (openFilePicker) {
            openFilePicker(props, onDone, onCancel);
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    private boolean checkPermissionsAndOpenFilePicker() {
        String permission = Manifest.permission.READ_EXTERNAL_STORAGE;

        if (ContextCompat.checkSelfPermission(getCurrentActivity(), permission) != PackageManager.PERMISSION_GRANTED) {
            if (ActivityCompat.shouldShowRequestPermissionRationale(getCurrentActivity(), permission)) {
                showError();
                return false;
            } else {
                ActivityCompat.requestPermissions(getCurrentActivity(), new String[]{permission}, PERMISSIONS_REQUEST_CODE);
                return true;
            }
        }

        return true;
    }

    private void showError() {
        Toast.makeText(getCurrentActivity(), "Allow external storage reading", Toast.LENGTH_SHORT).show();
    }


    private void openFilePicker(final ReadableMap props, final Callback onDone, final Callback onCancel) {
        MaterialFilePicker picker = new MaterialFilePicker();
        picker = picker.withActivity(getCurrentActivity());
        picker = picker.withRequestCode(1);

        String path = props.getString("path");
        boolean closeMenu = props.getBoolean("closeMenu");
        String title = props.getString("title");

        picker = picker.withChooseFolderMode(true);

        if (path.length() > 0) {
            picker = picker.withRootPath(path);
        }

        picker = picker.withCloseMenu(closeMenu);

        picker = picker.withTitle(title);

        this.onDone = onDone;
        this.onCancel = onCancel;

        picker.start();
    }

    private class ActivityEventListener implements com.facebook.react.bridge.ActivityEventListener {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

            if (requestCode == 1 && resultCode == AppCompatActivity.RESULT_OK) {
                String filePath = data.getStringExtra(FilePickerActivity.RESULT_FILE_PATH);

                if (onDone != null) {
                    onDone.invoke(filePath);
                }

                onDone = null;
            } else if (requestCode == 1 && resultCode == AppCompatActivity.RESULT_CANCELED) {
                if (onCancel != null) {
                    onCancel.invoke();
                }

                onCancel = null;
            }
        }

        @Override
        public void onNewIntent(Intent intent) {

        }
    }
}