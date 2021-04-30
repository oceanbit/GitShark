package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Ref;

import java.io.File;
import java.util.List;

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

    public static void listLocalBranches(
            String path, Promise promise
    ) {
        Git git;
        try {
            WritableArray branchNames = new WritableNativeArray();


            git = Git.open(new File(path));
            List<Ref> branches = git.branchList().call();
            for (Ref branch: branches) {
                branchNames.pushString(branch.getName().replaceFirst("^refs/heads/", ""));
            }
            promise.resolve(branchNames);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }

}
