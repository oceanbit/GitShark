package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;

import org.eclipse.jgit.api.CreateBranchCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.JGitInternalException;

import java.io.File;

public class GitCheckout {
    private static ReactApplicationContext reactContext;

    public GitCheckout(ReactApplicationContext context) {
        reactContext = context;
    }

    public void checkout(String path, String name, String newBranch, Promise promise) {
        Git git;
        try {
            git = Git.open(new File(path));
        } catch (Throwable e) {
            promise.reject(e);
            return;
        }

        try {
            if (name == null) {
                checkoutNewBranch(git, newBranch);
            } else {
                if (GitRepo.COMMIT_TYPE_REMOTE == GitRepo.getCommitType(name)) {
                    checkoutFromRemote(git, name, newBranch == null || newBranch.equals("") ? GitRepo.getCommitName(name) : newBranch);
                } else if (newBranch == null || newBranch.equals("")) {
                    checkoutFromLocal(git, name);
                } else {
                    checkoutFromLocal(git, name, newBranch);
                }
            }
        } catch (GitAPIException e) {
            promise.reject(e);
        } catch (JGitInternalException e) {
            promise.reject(e);
        } catch (Throwable e) {
            promise.reject(e);
        }

        promise.resolve(true);
    }

    public void checkoutNewBranch(Git git, String name) throws GitAPIException,
            JGitInternalException {
        git.checkout().setName(name).setCreateBranch(true).call();
    }

    public void checkoutFromLocal(Git git, String name) throws GitAPIException,
            JGitInternalException {
        git.checkout().setName(name).call();
    }

    public void checkoutFromLocal(Git git, String name, String branch) throws GitAPIException,
            JGitInternalException {
        git.checkout().setCreateBranch(true).setName(branch)
                .setStartPoint(name).call();
    }

    public void checkoutFromRemote(Git git, String remoteBranchName, String branchName)
            throws GitAPIException, JGitInternalException {
        git.checkout().setCreateBranch(true).setName(branchName)
                .setStartPoint(remoteBranchName).call();
        git
                .branchCreate()
                .setUpstreamMode(
                        CreateBranchCommand.SetupUpstreamMode.SET_UPSTREAM)
                .setStartPoint(remoteBranchName).setName(branchName)
                .setForce(true).call();
    }
}
