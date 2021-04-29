package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;

import java.io.File;

public class GitCurrentBranch {
    private static ReactApplicationContext reactContext;

    public GitCurrentBranch(ReactApplicationContext context) {
        reactContext = context;
    }

    public static void currentBranch(
            String path, Promise promise
    ) {
        Git git;
        Repository repo;
        String localBranch;
        try {
            git = Git.open(new File(path));
            repo = git.getRepository();
            localBranch = repo.getBranch();
            promise.resolve(localBranch);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
