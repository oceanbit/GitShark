package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.ListBranchCommand;
import org.eclipse.jgit.lib.Ref;

import java.io.File;
import java.util.List;

public class GitRemoteBranch {
    private static ReactApplicationContext reactContext;

    public GitRemoteBranch(ReactApplicationContext context) {
        reactContext = context;
    }

    public static void listRemoteBranches(
            String path, String remoteName, Promise promise
    ) {
        Git git;
        try {
            WritableArray branchNames = new WritableNativeArray();

            git = Git.open(new File(path));
            List<Ref> branches = git.branchList().setListMode(ListBranchCommand.ListMode.REMOTE).call();
            for (Ref branch: branches) {
                String branchName = branch.getName();
                if (branchName.startsWith("refs/remotes/" + remoteName)) {
                    branchNames.pushString(branch.getName().replaceFirst("^refs/remotes/" + remoteName + "/", ""));
                }
            }
            promise.resolve(branchNames);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }

}
