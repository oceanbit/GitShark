package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.ResetCommand;
import org.eclipse.jgit.lib.Repository;

import java.io.File;

public class GitRemoveFromStaged {
    static public void remove(
            String path, ReadableArray changes, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        try {
            ResetCommand cmd = git.reset();

            for (int i = 0; i < changes.size(); i++) {
                cmd.addPath(changes.getString(i));
            }

            cmd.call();
            promise.resolve(true);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
