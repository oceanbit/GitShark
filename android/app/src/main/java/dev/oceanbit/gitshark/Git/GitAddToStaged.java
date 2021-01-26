package dev.oceanbit.gitshark.Git;

import android.os.Build;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;

import org.eclipse.jgit.api.AddCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.RmCommand;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.util.FileUtils;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class GitAddToStaged {
    @RequiresApi(api = Build.VERSION_CODES.O)
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
                Path filePath = Paths.get(path, relPath);
                Boolean toAdd = Files.exists(filePath);

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
