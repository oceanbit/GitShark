package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.PullCommand;
import org.eclipse.jgit.lib.ProgressMonitor;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;

import java.io.File;
import java.util.Locale;

import dev.oceanbit.gitshark.Throttle;

public class GitPull {
    private static ReactApplicationContext reactContext;

    public GitPull(ReactApplicationContext context) {
        reactContext = context;
    }

    private Throttle mThrottle = new Throttle(250);

    public void pull(
            String path,
            String remote,
            String remoteRef,
            // TODO: Migrate away from passing this value from JS and calling this value from Java instead
            String authToken,
            Promise promise
    ) {
        Git git;
        Repository repo;
        try {
            git = Git.open(new File(path));
            repo = git.getRepository();
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        PullCommand gitPull = git.pull()
                .setRemote(remote)
                .setRemoteBranchName(remoteRef)
                .setProgressMonitor(new PullMonitor());

        if (!authToken.isEmpty()) {
            // @see https://www.codeaffine.com/2014/12/09/jgit-authentication/
            gitPull.setCredentialsProvider(
                    new UsernamePasswordCredentialsProvider( "token", authToken )
            );
        }

        try {
            gitPull.call();
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        promise.resolve(true);
    }


    public class PullMonitor implements ProgressMonitor {
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
                    .emit("PullProgress", returnMap));
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
