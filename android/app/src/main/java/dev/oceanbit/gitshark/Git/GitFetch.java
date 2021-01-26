package dev.oceanbit.gitshark.Git;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.eclipse.jgit.api.FetchCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.BranchConfig;
import org.eclipse.jgit.lib.ProgressMonitor;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.transport.RefSpec;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;

import java.io.File;
import java.util.Locale;

import dev.oceanbit.gitshark.Throttle;

public class GitFetch {
    private static ReactApplicationContext reactContext;

    public GitFetch(ReactApplicationContext context) {
        reactContext = context;
    }

    private Throttle mThrottle = new Throttle(250);

    public void fetch(
            String path,
            String remote,
            Boolean singleBranch,
            Boolean prune,
            Promise promise
    ) {
        Git git;
        Repository repo;
        String localBranch;
        String trackedBranch;
        try {
            git = Git.open(new File(path));
            repo = git.getRepository();
            localBranch = repo.getBranch();
            trackedBranch = new BranchConfig(repo.getConfig(), localBranch).getTrackingBranch();
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        FetchCommand gitFetch = git.fetch()
                .setRemoveDeletedRefs(prune)
                .setRemote(remote)
                .setProgressMonitor(new FetchMonitor());

        // TODO: Singlebranch behavior is not implemented and is disabled in the UI
//        if (singleBranch) {
//            String remoteRef = trackedBranch.replace("refs/remotes/" + remote + "/", "");
//            RefSpec ref = new RefSpec(remoteRef + ":" + localBranch);
//
//            gitFetch
//                    .setRefSpecs(ref);
//        }

        String ghToken = GhTokenUtils.getGitHubToken(reactContext);

        if (!ghToken.isEmpty()) {
            // @see https://www.codeaffine.com/2014/12/09/jgit-authentication/
            gitFetch.setCredentialsProvider(
                    new UsernamePasswordCredentialsProvider("token", ghToken)
            );
        }

        try {
            gitFetch.call();
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        promise.resolve(true);
    }


    public class FetchMonitor implements ProgressMonitor {
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
                    .emit("FetchProgress", returnMap));
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
