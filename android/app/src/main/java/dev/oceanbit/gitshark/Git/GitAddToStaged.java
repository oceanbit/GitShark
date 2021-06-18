package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;

import org.eclipse.jgit.api.AddCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.RmCommand;

import java.io.File;

public class GitAddToStaged {
    static public void add(
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
            Integer addItems = 0;
            Integer rmItems = 0;
            AddCommand addCmd = git.add();
            RmCommand rmCmd = git.rm();

            for (int i = 0; i < changes.size(); i++) {
                String relPath = changes.getString(i);
                File file = new File(path, relPath);
                Boolean toAdd = file.exists();

                if (toAdd) {
                    addItems++;
                    addCmd.addFilepattern(relPath);
                } else {
                    rmItems++;
                    rmCmd.addFilepattern(relPath);
                }
            }

            if (addItems > 0) {
                addCmd.call();
            }
            if (rmItems > 0) {
                rmCmd.call();
            }
            promise.resolve(true);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
