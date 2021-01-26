package dev.oceanbit.gitshark;

import android.view.animation.AnimationUtils;

/**
 * This is present because otherwise it will spam so many event listeners that it will actually slow down
 * the UI thread trying to draw all the updates. It's not pretty
 *
 * Thank you kindly for the code, friend
 *
 * @see @link http://blog.moagrius.com/android/android-throttle-and-debounce/
 */
public class Throttle {
    private long mLastFiredTimestamp;
    private long mInterval;

    public Throttle(long interval) {
        mInterval = interval;
    }

    public void attempt(Runnable runnable) {
        if (hasSatisfiedInterval()) {
            runnable.run();
            mLastFiredTimestamp = getNow();
        }
    }

    private boolean hasSatisfiedInterval() {
        long elapsed = getNow() - mLastFiredTimestamp;
        return elapsed >= mInterval;
    }

    private long getNow() {
        return AnimationUtils.currentAnimationTimeMillis();
    }
}