package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import org.eclipse.jgit.api.CommitCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;

import java.io.File;

public class GitCommit {
    private static ReactApplicationContext reactContext;

    public GitCommit(ReactApplicationContext context) {
        reactContext = context;
    }

    public void commit(
            String path, String authorEmail, String authorName, String message, Promise promise
    ) {
        Git git;
        try {
            git = Git.open(new File(path));
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        try {
            CommitCommand commitCmd = git.commit();

            commitCmd
                    // Until we can figure out a way to call into an SSH instance or something,
                    // it makes no sense to try to use the hooks
                    .setNoVerify(true)
                    .setAuthor(authorName, authorEmail)
                    .setCommitter(authorName, authorEmail)
                    .setMessage(message);

            String ghToken = GhTokenUtils.getGitHubToken(reactContext);

            if (!ghToken.isEmpty()) {
                // @see https://www.codeaffine.com/2014/12/09/jgit-authentication/
                commitCmd.setCredentialsProvider(
                        new UsernamePasswordCredentialsProvider("token", ghToken)
                );
            }


            commitCmd.call();
            promise.resolve(true);
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }
    }
}
