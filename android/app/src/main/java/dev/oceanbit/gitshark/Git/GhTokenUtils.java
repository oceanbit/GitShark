package dev.oceanbit.gitshark.Git;

import com.facebook.react.bridge.ReactApplicationContext;
import com.reactlibrary.securekeystore.RNSecureKeyStoreModule;

import java.io.FileNotFoundException;

public class GhTokenUtils {
    static public String getGitHubToken(ReactApplicationContext reactContext) {

        RNSecureKeyStoreModule keyStoreModule = new RNSecureKeyStoreModule(reactContext);

        String ghToken = "";
        try {
            ghToken = keyStoreModule.getPlainText("ghToken");
            // User is not logged into GH
        } catch (FileNotFoundException e) {
            ;
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return ghToken;
    }
}
