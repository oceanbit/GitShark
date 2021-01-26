package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactlibrary.securekeystore.RNSecureKeyStoreModule;

import org.eclipse.jgit.api.CloneCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.ProgressMonitor;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Locale;

import dev.oceanbit.gitshark.Throttle;

public class GitClone {
    private static ReactApplicationContext reactContext;

    public GitClone(ReactApplicationContext context) {
        reactContext = context;
    }

    private Throttle mThrottle = new Throttle(250);

    public void clone(String uri, String path, Promise promise) {

        RNSecureKeyStoreModule keyStoreModule = new RNSecureKeyStoreModule(reactContext);

        String ghToken = "";
        try {
            ghToken = keyStoreModule.getPlainText("ghToken");
            // User is not logged into GH
        } catch (FileNotFoundException e) {
            ;
        } catch (Throwable e) {
            e.printStackTrace();
            promise.reject(e);
        }

        CloneCommand cloneCommand = Git.cloneRepository()
                .setURI(uri)
                .setCloneAllBranches(true)
                .setProgressMonitor(new RepoCloneMonitor())
                .setDirectory(new File(path));

        if (!ghToken.isEmpty()) {
            UsernamePasswordCredentialsProvider auth = new UsernamePasswordCredentialsProvider(
                    ghToken, "x-oauth-basic");
            cloneCommand.setCredentialsProvider(auth);
        }

        try {
            cloneCommand.call();
            // This calls after the `call` is finished (puh-raise)
            promise.resolve(true);
        } catch (
                Throwable e) {
            promise.reject(e);
        }
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

}
