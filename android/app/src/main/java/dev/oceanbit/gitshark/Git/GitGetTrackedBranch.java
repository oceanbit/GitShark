package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.BranchConfig;
import org.eclipse.jgit.lib.Repository;

import java.io.File;

public class GitGetTrackedBranch {
    static public void getTrackedBranch(
            String path,
            String branchName,
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

        try {
            String trackedBranch = new BranchConfig(repo.getConfig(), branchName).getTrackingBranch();

            promise.resolve(trackedBranch);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        promise.resolve(true);
    }
}
