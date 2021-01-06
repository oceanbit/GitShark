package dev.oceanbit.gitshark;

import com.facebook.react.bridge.ReactApplicationContext;

import org.eclipse.jgit.lib.Repository;

public class GitRepo {
    public static final int COMMIT_TYPE_HEAD = 0;
    public static final int COMMIT_TYPE_TAG = 1;
    public static final int COMMIT_TYPE_TEMP = 2;
    public static final int COMMIT_TYPE_REMOTE = 3;
    public static final int COMMIT_TYPE_UNKNOWN = -1;

    /**
     * Returns the type of ref based on the refs full path within .git/
     * @param fullRefName
     * @return
     */
    public static int getCommitType(String fullRefName) {
        if (fullRefName != null && fullRefName.startsWith("refs/")) {
            if (fullRefName.startsWith("refs/heads/")) {
                return COMMIT_TYPE_HEAD;
            } else if (fullRefName.startsWith("refs/tags/")) {
                return COMMIT_TYPE_TAG;
            } else if (fullRefName.startsWith("refs/remotes/")) {
                return  COMMIT_TYPE_REMOTE;
            }
        }
        return COMMIT_TYPE_UNKNOWN;
    }

    public static int getCommitType(String[] splits) {
        if (splits.length == 4)
            return COMMIT_TYPE_REMOTE;
        if (splits.length != 3)
            return COMMIT_TYPE_TEMP;
        String type = splits[1];
        if ("tags".equals(type))
            return COMMIT_TYPE_TAG;
        return COMMIT_TYPE_HEAD;
    }

    /**
     * Return just the name of the ref, with any prefixes like "heads", "remotes", "tags" etc.
     * @param name
     * @return
     */
    public static String getCommitName(String name) {
        String[] splits = name.split("/");
        int type = getCommitType(splits);
        switch (type) {
            case COMMIT_TYPE_TEMP:
            case COMMIT_TYPE_TAG:
            case COMMIT_TYPE_HEAD:
                return getCommitDisplayName(name);
            case COMMIT_TYPE_REMOTE:
                return splits[3];
        }
        return null;
    }

    /**
     *
     * @param ref
     * @return  Shortened version of full ref path, suitable for display in UI
     */
    public static String getCommitDisplayName(String ref) {
        if (getCommitType(ref) == COMMIT_TYPE_REMOTE) {
            return (ref != null && ref.length() > "refs/".length()) ? ref.substring("refs/".length()) : "";
        }
        return Repository.shortenRefName(ref);
    }
}
