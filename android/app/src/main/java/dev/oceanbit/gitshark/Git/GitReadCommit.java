package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;

import java.io.File;

public class GitReadCommit {
    static public void readCommit(
            String path, String oid, Promise promise
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
            ObjectId newCommitId = repo.resolve(oid);
            Iterable<RevCommit> mCommits = git.log().add(newCommitId).setMaxCount(1).call();
            RevCommit revCommit = mCommits.iterator().next();
            WritableMap commit = GitUtils.revCommitToMap(revCommit);
            promise.resolve(commit);
            return;
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
