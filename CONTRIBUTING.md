## iOS Setup

In order to deploy to iOS, you'll need to install:

- XCode
- [CocoaPods](https://guides.cocoapods.org/using/getting-started.html)
- [Homebrew](https://brew.sh/)
    - `brew install cmake libtool autoconf automake pkg-config libssh2 carthage`

Then, once that's done, you'll need to:

- `cd ios`
- `pod install`
- `carthage update`
