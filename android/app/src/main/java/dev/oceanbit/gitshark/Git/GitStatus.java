package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.api.Git;

import java.io.File;
import java.util.Set;

public class GitStatus {
    static public void status(String path, Promise promise) {
        Git git;
        try {
            git = Git.open(new File(path));
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
        WritableArray result;
        try {
            result = new WritableNativeArray();
            org.eclipse.jgit.api.Status status = git.status().call();
            if (!status.hasUncommittedChanges() && status.isClean()) {
                promise.resolve(result);
            }

            // Staged, new file
            Set<String> added = status.getAdded();
            for (String addFile : added) {
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("fileName", addFile);
                fileMap.putBoolean("staged", true);
                fileMap.putBoolean("unstagedChanges", true);
                fileMap.putString("fileStatus", "added");
                result.pushMap(fileMap);
            }

            // Unstaged, new file
            Set<String> untracked = status.getUntracked();

            // Staged, removed
            Set<String> removed = status.getRemoved();

            for (String untrackFile : untracked) {
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("fileName", untrackFile);
                fileMap.putBoolean("staged", false);
                fileMap.putBoolean("unstagedChanges", false);

                // There's a bug that causes file-endings to report as missing and not missing at once
                if (removed.contains(untrackFile)) {
                    fileMap.putString("fileStatus", "modified");
                } else {
                    fileMap.putString("fileStatus", "added");
                }
                result.pushMap(fileMap);
            }

            // Staged, modified
            Set<String> changed = status.getChanged();
            for (String changeFile : changed) {
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("fileName", changeFile);
                fileMap.putBoolean("staged", true);
                fileMap.putBoolean("unstagedChanges", true);
                fileMap.putString("fileStatus", "modified");
                result.pushMap(fileMap);
            }

            // Unstaged, modified
            Set<String> modified = status.getModified();
            for (String modFile : modified) {
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("fileName", modFile);
                fileMap.putBoolean("staged", false);
                fileMap.putBoolean("unstagedChanges", false);
                fileMap.putString("fileStatus", "modified");
                result.pushMap(fileMap);
            }

            for (String rmFile : removed) {
                if (untracked.contains(rmFile)) {
                    continue;
                }
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("fileName", rmFile);
                fileMap.putBoolean("staged", true);
                fileMap.putBoolean("unstagedChanges", true);
                fileMap.putString("fileStatus", "deleted");
                result.pushMap(fileMap);
            }

            // Unstaged, removed
            Set<String> missing = status.getMissing();
            for (String missFile : missing) {
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("fileName", missFile);
                fileMap.putBoolean("staged", false);
                fileMap.putBoolean("unstagedChanges", false);
                fileMap.putString("fileStatus", "deleted");
                result.pushMap(fileMap);
            }

            // Uh oh
            Set<String> conflicting = status.getConflicting();
            for (String conflictFile : conflicting) {
                WritableMap fileMap = Arguments.createMap();
                fileMap.putString("fileName", conflictFile);
                fileMap.putBoolean("staged", false);
                fileMap.putBoolean("unstagedChanges", false);
                fileMap.putString("fileStatus", "conflict");
                result.pushMap(fileMap);
            }

            promise.resolve(result);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }

}
