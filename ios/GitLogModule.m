#import "GitLogModule.h"

#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>

#import <ObjectiveGit/ObjectiveGit.h>

/**
 * @see https://github.com/libgit2/libgit2/blob/main/examples/log.c
 * @see https://libgit2.org/libgit2/ex/HEAD/log.html
 */
@implementation GitLogModule

/** log_state represents walker being configured while handling options */
struct log_state {
    git_repository *repo;
    git_revwalk *walker;
    int hide;
    int sorting;
    int revisions;
};

/** utility functions that are called to configure the walker */
static void push_rev(struct log_state *s, git_object *obj, int hide);
static int add_revision(struct log_state *s, const char *revstr);


static void print_commit(git_commit *commit);

int lg2_log(git_repository *repo)
{
    int i, count = 0, printed = 0, parents, last_arg;
    struct log_state s;
    git_diff_options diffopts = GIT_DIFF_OPTIONS_INIT;
    git_oid oid;
    git_commit *commit = NULL;
    git_pathspec *ps = NULL;

    /** Parse arguments and set up revwalker. */
    s.repo = repo;

    if (!s.revisions)
        push_rev(&s, NULL, 0);

    /** Use the revwalker to traverse the history. */

    printed = count = 0;

    for (; !git_revwalk_next(&oid, s.walker); git_commit_free(commit)) {
        check_lg2(git_commit_lookup(&commit, s.repo, &oid),
                "Failed to look up commit", NULL);

        parents = (int)git_commit_parentcount(commit);
        print_commit(commit);
    }

    git_pathspec_free(ps);
    git_revwalk_free(s.walker);

    return 0;
}

/** Push object (for hide or show) onto revwalker. */
static void push_rev(struct log_state *s, git_object *obj, int hide)
{
    hide = s->hide ^ hide;

    /** Create revwalker on demand if it doesn't already exist. */
    if (!s->walker) {
        check_lg2(git_revwalk_new(&s->walker, s->repo),
                "Could not create revision walker", NULL);
        git_revwalk_sorting(s->walker, s->sorting);
    }

    if (!obj)
        check_lg2(git_revwalk_push_head(s->walker),
                "Could not find repository HEAD", NULL);
    else if (hide)
        check_lg2(git_revwalk_hide(s->walker, git_object_id(obj)),
                "Reference does not refer to a commit", NULL);
    else
        check_lg2(git_revwalk_push(s->walker, git_object_id(obj)),
                "Reference does not refer to a commit", NULL);

    git_object_free(obj);
}

/** Helper to print a commit object. */
static void print_commit(git_commit *commit)
{
    char buf[GIT_OID_HEXSZ + 1];
    int i, count;
    const git_signature *sig;
    const char *scan, *eol;

    git_oid_tostr(buf, sizeof(buf), git_commit_id(commit));
    printf("commit %s\n", buf);

    if ((count = (int)git_commit_parentcount(commit)) > 1) {
        printf("Merge:");
        for (i = 0; i < count; ++i) {
            git_oid_tostr(buf, 8, git_commit_parent_id(commit, i));
            printf(" %s", buf);
        }
        printf("\n");
    }

    if ((sig = git_commit_author(commit)) != NULL) {
        printf("Author: %s <%s>\n", sig->name, sig->email);
//        print_time(&sig->when, "Date:   ");
    }
    printf("\n");

    for (scan = git_commit_message(commit); scan && *scan; ) {
        for (eol = scan; *eol && *eol != '\n'; ++eol) /* find eol */;

        printf("    %.*s\n", (int)(eol - scan), scan);
        scan = *eol ? eol + 1 : NULL;
    }
    printf("\n");
}

@end