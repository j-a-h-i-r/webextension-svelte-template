Sets up a repository for building web-extensions with svelte.

Template for Popup, Options page, Background Scripts and Content Scripts are set up. It also includes some factory functions for creating svelte stores backed up by `chrome.storage.local`

#### Popup
Sources are in `src/popup` directory. `Popup.svelte` is the starting point of the popup that will be displayed.

#### Options
Sources reside in `src/options` directory. `Options.svelte` is the starting point for the options page that will be displayed.

#### Background Scripts
Source is in `src/background.ts` file.

Background scripts are simple ts files without any svelte scripts/templates. This file is simply transpiled to JS.

#### Content Scripts
Sources are in `src/content_scripts` directory.

These are also just ts files and simply transpiled to JS.

#### Stores
Source are in `src/stores` directory.


### Build configuraion
Build configuration is stored in `rollup.config.js` file taken from here (https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate/blob/main/rollup.config.js). 

In the `createConfig` function the `useSvelte` parameter is used to decide whether to compile svelte templates or not. Passing `false` (the default value) will simply do a transpilation without invoking svelte processor.
