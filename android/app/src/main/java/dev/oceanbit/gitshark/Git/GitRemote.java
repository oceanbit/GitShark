package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.transport.URIish;

import java.io.File;

public class GitRemote {
    private static ReactApplicationContext reactContext;

    public GitRemote(ReactApplicationContext context) {
        reactContext = context;
    }

    public static void addRemote(
            String path, String remoteName, String remoteURL, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));

            git.remoteAdd().setName(remoteName).setUri(new URIish(remoteURL)).call();

            promise.resolve(null);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
