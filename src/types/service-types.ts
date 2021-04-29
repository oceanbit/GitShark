export type GitProgressEvent = {
  phase: string;
  loaded: number;
  total: number;
};

export type ProgressCallback = (
  progress: GitProgressEvent,
) => void | Promise<void>;

export type CommitObject = {
  /**
   * Commit message
   */
  message: string;
  /**
   * SHA-1 object id of corresponding file tree
   */
  tree: string;
  /**
   * an array of zero or more SHA-1 object ids
   */
  parent: string[];
  author: {
    /**
     * The author's name
     */
    name: string;
    /**
     * The author's email
     */
    email: string;
    /**
     * UTC Unix timestamp in seconds
     */
    timestamp: number;
    /**
     * Timezone difference from UTC in minutes
     */
    timezoneOffset: number;
  };
  committer: {
    /**
     * The committer's name
     */
    name: string;
    /**
     * The committer's email
     */
    email: string;
    /**
     * UTC Unix timestamp in seconds
     */
    timestamp: number;
    /**
     * Timezone difference from UTC in minutes
     */
    timezoneOffset: number;
  };
  /**
   * PGP signature (if present)
   */
  gpgsig?: string;
};
