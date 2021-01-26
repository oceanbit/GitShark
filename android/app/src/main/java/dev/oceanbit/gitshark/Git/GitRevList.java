package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.LogCommand;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;

import java.io.File;

public class GitRevList {
    static public void revList(String path, String branch1Ref, String branch2Ref, Promise promise) {
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
            ObjectId branch1 = repo.resolve(branch1Ref);
            ObjectId branch2 = repo.resolve(branch2Ref);

            LogCommand branch1Cmd = git.log().addRange(branch1, branch2);
            Iterable<RevCommit> branch1Commits = branch1Cmd.call();
            WritableArray branch1Diff = new WritableNativeArray();
            for (RevCommit commit : branch1Commits) {
                // Prepare data for storage later
                String oid = commit.toObjectId().toString();
                branch1Diff.pushString(oid);
            }


            LogCommand branch2Cmd = git.log().addRange(branch2, branch1);
            Iterable<RevCommit> branch2Commits = branch2Cmd.call();
            WritableArray branch2Diff = new WritableNativeArray();
            for (RevCommit commit : branch2Commits) {
                // Prepare data for storage later
                String oid = commit.toObjectId().toString();
                branch2Diff.pushString(oid);
            }

            WritableMap result = Arguments.createMap();
            result.putArray("branch1Diff", branch1Diff);
            result.putArray("branch2Diff", branch2Diff);

            promise.resolve(result);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
