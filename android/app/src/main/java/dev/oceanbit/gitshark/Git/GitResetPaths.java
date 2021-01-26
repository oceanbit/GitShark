package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;

import org.eclipse.jgit.api.CheckoutCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;

import java.io.File;
import java.util.ArrayList;

public class GitResetPaths {
    static public void restPaths(
            String path, ReadableArray files, Promise promise
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

        ArrayList<String> gitPaths = new ArrayList<String>();

        for (int i = 0; i < files.size(); i++) {
            gitPaths.add(files.getString(i));
        }

        CheckoutCommand gitCheckout = git.checkout().setStartPoint("HEAD").addPaths(gitPaths);

        try {
            gitCheckout.call();
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        promise.resolve(true);
    }
}
