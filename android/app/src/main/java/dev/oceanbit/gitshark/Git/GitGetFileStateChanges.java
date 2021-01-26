package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.ObjectReader;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.treewalk.CanonicalTreeParser;
import org.eclipse.jgit.util.io.DisabledOutputStream;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class GitGetFileStateChanges {
    //Helper function to get the tree of the changes in a commit. Written by Rüdiger Herrmann
    static private CanonicalTreeParser getCanonicalTreeParser(Git git, ObjectId commitId) throws IOException {
        RevWalk walk = new RevWalk(git.getRepository());
        RevCommit commit = walk.parseCommit(commitId);
        ObjectId treeId = commit.getTree().getId();
        ObjectReader reader = git.getRepository().newObjectReader();
        return new CanonicalTreeParser(null, reader, treeId);
    }

    static public void getFileStateChanges(String path, String commit1, String commit2, Promise promise) {
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
            CanonicalTreeParser oldTreeIter = getCanonicalTreeParser(git, repo.resolve(commit1));
            CanonicalTreeParser newTreeIter = getCanonicalTreeParser(git, repo.resolve(commit2));

            DiffFormatter diffFormatter = new DiffFormatter(DisabledOutputStream.INSTANCE);
            diffFormatter.setRepository(git.getRepository());
            List<DiffEntry> entries = diffFormatter.scan(oldTreeIter, newTreeIter);

            WritableArray changeItems = new WritableNativeArray();

            for (DiffEntry entry : entries) {
                String fileName = entry.getNewPath();

                String fileStatus = "";
                switch (entry.getChangeType()) {
                    case COPY:
                    case ADD:
                        fileStatus = "added";
                        break;
                    case RENAME:
                    case MODIFY:
                        fileStatus = "modified";
                        break;
                    case DELETE:
                    default:
                        fileStatus = "deleted";
                        // Otherwise, this will show as `/dev/null`
                        fileName = entry.getOldPath();
                        break;
                }

                WritableMap changeItem = Arguments.createMap();
                changeItem.putString("fileName", fileName);
                changeItem.putString("fileStatus", fileStatus);
                changeItem.putBoolean("staged", false);
                changeItem.putBoolean("unstagedChanges", false);
                changeItems.pushMap(changeItem);
            }

            promise.resolve(changeItems);

        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
