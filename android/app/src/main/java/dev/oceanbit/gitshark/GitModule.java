package dev.oceanbit.gitshark;

import android.util.Log;
import android.view.animation.AnimationUtils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactlibrary.securekeystore.RNSecureKeyStoreModule;

import org.eclipse.jgit.api.CloneCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.InvalidRemoteException;
import org.eclipse.jgit.api.errors.JGitInternalException;
import org.eclipse.jgit.api.errors.TransportException;
import org.eclipse.jgit.errors.NotSupportedException;
import org.eclipse.jgit.lib.ProgressMonitor;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Locale;

/**
 * This is present because otherwise it will spam so many event listeners that it will actually slow down
 * the UI thread trying to draw all the updates. It's not pretty
 *
 * Thank you kindly for the code, friend
 * @see @link http://blog.moagrius.com/android/android-throttle-and-debounce/
 */
class Throttle {
    private long mLastFiredTimestamp;
    private long mInterval;

    public Throttle(long interval) {
        mInterval = interval;
    }

    public void attempt(Runnable runnable) {
        if (hasSatisfiedInterval()) {
            runnable.run();
            mLastFiredTimestamp = getNow();
        }
    }

    private boolean hasSatisfiedInterval() {
        long elapsed = getNow() - mLastFiredTimestamp;
        return elapsed >= mInterval;
    }

    private long getNow() {
        return AnimationUtils.currentAnimationTimeMillis();
    }
}

public class GitModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private Throttle mThrottle = new Throttle(250);

    GitModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void clone(String uri, String path,
                      Promise promise) {
        new Thread(new Runnable() {

            @Override
            public void run() {

                CloneCommand cloneCommand = Git.cloneRepository()
                        .setURI(uri)
                        .setCloneAllBranches(true)
                        .setProgressMonitor(new RepoCloneMonitor())
                        .setDirectory(new File(path));

                try {
                    cloneCommand.call();
                    // This calls after the `call` is finished (puh-raise)
                    promise.resolve(true);
                } catch (
                        Throwable e) {
                    promise.reject(e);
                }
            }
        }).start();
    }

    public class RepoCloneMonitor implements ProgressMonitor {
        private int mFinishedTasks;
        private int mTotalWork;
        private int mWorkDone;
        private String mTitle;

        private void publishProgressInner() {
            String status = "";
            if (mTitle != null) {
                status = String.format(Locale.getDefault(), "%s ... ", mTitle);
            }
            WritableMap returnMap = Arguments.createMap();

            returnMap.putString("phase", status);
            returnMap.putInt("loaded", mWorkDone);
            returnMap.putInt("total", mTotalWork);

            mThrottle.attempt(() -> reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("CloneProgress", returnMap));
        }

        @Override
        public void start(int totalTasks) {
            publishProgressInner();
        }

        @Override
        public void beginTask(String title, int totalWork) {
            mTotalWork = totalWork;
            mWorkDone = 0;
            mTitle = title;
            publishProgressInner();
        }

        @Override
        public void update(int i) {
            mWorkDone += i;
            publishProgressInner();
        }

        @Override
        public void endTask() {
        }

        @Override
        public boolean isCancelled() {
            return false;
        }
    }


    @NonNull
    public String getName() {
        return "GitModule";
    }
}
