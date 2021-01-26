package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.LogCommand;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;

import java.io.File;

public class GitLog {
    static public void gitLog(
            String path, String oidRef, Promise promise
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
        WritableArray result;
        ObjectId ref;
        try {
            if (oidRef.isEmpty()) {
                ref = repo.resolve(Constants.HEAD);
            } else {
                ref = repo.resolve(oidRef);
            }

            LogCommand cmd = git.log().add(ref);

            Iterable<RevCommit> commits = cmd.call();
            result = new WritableNativeArray();
            for (RevCommit commit : commits) {
                result.pushMap(GitUtils.revCommitToMap(commit));
            }
            promise.resolve(result);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
