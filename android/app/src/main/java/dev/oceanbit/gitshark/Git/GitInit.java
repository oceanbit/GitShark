package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Ref;

import java.io.File;
import java.util.List;

public class GitInit {
    private static ReactApplicationContext reactContext;

    public GitInit(ReactApplicationContext context) {
        reactContext = context;
    }

    public static void gitInit(
            String path, Promise promise
    ) {
        Git git;
        try {
            git = Git.init().setDirectory(new File(path)).call();
            promise.resolve(null);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
