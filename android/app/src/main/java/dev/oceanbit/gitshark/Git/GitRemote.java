package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.StoredConfig;

import java.io.File;
import java.util.Set;

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

            StoredConfig config = git.getRepository().getConfig();
            Set<String> remoteNames = config.getSubsections("remote");
            config.setString("remote", remoteName, "url", remoteURL);
            String fetch = String.format("+refs/heads/*:refs/remotes/%s/*",
                    remoteName);
            config.setString("remote", remoteName, "fetch", fetch);
            config.save();

            promise.resolve(null);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }

    public static void listRemotes(
            String path, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));

            StoredConfig config = git.getRepository().getConfig();
            Set<String> remotes = config.getSubsections("remote");

            WritableArray remoteNames = Arguments.createArray();

            for (String remote: remotes) {
                WritableMap result = Arguments.createMap();
                String url = config.getString("remote", remote, "url");
                result.putString("remote", remote);
                result.putString("url", url);
                remoteNames.pushMap(result);
            }

            promise.resolve(remoteNames);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
