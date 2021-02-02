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

## Font Update

We use a custom font for our icons in the app. Some resources for that include:

- https://medium.com/mabiloft/we-designed-an-icon-font-with-figma-and-fontello-and-it-has-not-been-a-piece-of-cake-b2948973738e

Once the files are exported from Figma and downloaded from Icomoon, a few files need to be replaced:

- `assets\fonts\icomoon.ttf` - iOS Font file
- `android\app\src\main\assets\fonts\icomoon.ttf` - Android Font File
- `public\fonts\icomoon.ttf` - Storybook Font File
- `src\components\shark-icon\selection.json` - Icon shortname mapping
