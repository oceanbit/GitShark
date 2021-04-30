package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import org.eclipse.jgit.api.Git;

import java.io.File;

public class GitLocalBranch {
    private static ReactApplicationContext reactContext;

    public GitLocalBranch(ReactApplicationContext context) {
        reactContext = context;
    }

    public static void createBranch(
            String path, String branchName, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));
            git.branchCreate().setName(branchName).call();
            promise.resolve(null);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }

    public static void deleteBranch(
            String path, String branchName, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));
            git.branchDelete().setBranchNames(branchName).call();
            promise.resolve(null);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }


    public static void renameBranch(
            String path, String branchName, String newBranchName, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));
            git.branchRename().setOldName(branchName).setNewName(newBranchName).call();
            promise.resolve(null);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }


}
