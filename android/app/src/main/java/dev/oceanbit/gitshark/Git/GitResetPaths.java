package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;

import org.eclipse.jgit.api.CheckoutCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.Status;

import java.io.File;
import java.util.ArrayList;
import java.util.Set;

public class GitResetPaths {
    static public void restPaths(
            String path, ReadableArray files, Promise promise
    ) {
        Git git;
        Status status;
        try {
            git = Git.open(new File(path));
            status = git.status().call();
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        try {
            // Unstaged, new file
            Set<String> untracked = status.getUntracked();

            ArrayList<String> gitPaths = new ArrayList<String>();

            Integer checkoutFiles = 0;

            for (int i = 0; i < files.size(); i++) {
                String filePath = files.getString(i);

                if (untracked.contains(filePath)) {
                    File untrackFile = new File(path, filePath);
                    untrackFile.delete();
                } else {
                    gitPaths.add(filePath);
                    checkoutFiles++;
                }
            }

            if (checkoutFiles > 0) {
                CheckoutCommand gitCheckout = git.checkout().setStartPoint("HEAD");

                for (String gitPath: gitPaths) {
                    gitCheckout.addPath(gitPath);
                }

                gitCheckout.call();
            }
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        promise.resolve(true);
    }
}
