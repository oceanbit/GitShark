package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.lib.PersonIdent;
import org.eclipse.jgit.revwalk.RevCommit;

public class GitUtils {
    static public WritableMap revCommitToMap(RevCommit revCommit) {
        // Prepare data for storage later
        String oid = revCommit.toObjectId().toString();
        String message = revCommit.getFullMessage();
        RevCommit[] parents = revCommit.getParents();
        PersonIdent authorIdent = revCommit.getAuthorIdent();
        PersonIdent committerIdent = revCommit.getCommitterIdent();

        // Convert parents to id strings
        WritableArray parentIds = new WritableNativeArray();

        for (RevCommit parent : parents) {
            parentIds.pushString(parent.toObjectId().toString());
        }

        // Convert author to writable map
        WritableMap author = Arguments.createMap();
        author.putString("name", authorIdent.getName());
        author.putString("email", authorIdent.getEmailAddress());
        author.putInt("timestamp", (int) (authorIdent.getWhen().getTime() / 1000));

        // Convert commiter to writable map
        WritableMap committer = Arguments.createMap();
        committer.putString("name", committerIdent.getName());
        committer.putString("email", committerIdent.getEmailAddress());
        committer.putInt("timestamp", (int) (committerIdent.getWhen().getTime() / 1000));

        // Write everything to map
        WritableMap commitMap = Arguments.createMap();
        commitMap.putString("oid", oid);
        commitMap.putArray("parent", parentIds);
        commitMap.putString("message", message);
        commitMap.putMap("author", author);
        commitMap.putMap("committer", committer);

        return commitMap;
    }
}
