package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.transport.RemoteConfig;
import org.eclipse.jgit.transport.URIish;

import java.io.File;
import java.util.List;

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

    public static void listRemotes(
            String path, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));

            List<RemoteConfig> remotes = git.remoteList().call();

            WritableArray remoteNames = Arguments.createArray();

            for (RemoteConfig remote: remotes) {
                WritableMap result = Arguments.createMap();
                result.putString("remote", remote.getName());
                result.putString("url", remote.getURIs().get(0).toString());
                remoteNames.pushMap(result);
            }

            promise.resolve(remoteNames);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
