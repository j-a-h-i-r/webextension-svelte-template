Sets up a repository for building web-extensions with svelte.

Template for Popup, Options page, Background Scripts and Content Scripts are set up. It also includes some factory functions for creating svelte stores backed up by `chrome.storage.local`

### Running the scripts

To run the project during development (with compile on change)
```
npm run dev
```

For getting a completed build,
```
npm run build
```

### Project organization

#### Popup
Sources are in `src/app/popup` directory. `Popup.svelte` is the starting point of the popup that will be displayed.

#### Options
Sources reside in `src/app/options` directory. `Options.svelte` is the starting point for the options page that will be displayed.

#### Background Scripts
There can be multiple background scripts in an extension. The background scripts live in `src/app/background` directory.

Background scripts are simple ts files without any svelte scripts/templates. These files are simply transpiled to JS.

#### Content Scripts
Sources are in `src/app/content_scripts` directory.

These are also just ts files and simply transpiled to JS.

#### Stores
Source are in `src/app/stores` directory.


### Build configuraion
Build configuration is stored in `rollup.config.js` file taken from here (https://github.com/NekitCorp/chrome-extension-svelte-typescript-boilerplate/blob/main/rollup.config.js).

There are a couple of helpful functions there to help process the files.

#### Compiling Svelte files
The popup and options components are the ones that are written in svelte. These files are compiled and processed using the `createConfig` function.

#### Compiling ts files
The background and content scripts need to be transpiled only. The `compileDir` function takes a directory and compiles all the files in that directory to js.

#### Copying assests and CSS
The `copyAssets` function copies the static assets (manifest.json, images, css etc.) to the output folder.  

### FAQ

#### Adding external CSS

Add the CSS file in the `src/static/css` directory and import the file in the `index.css` file.

```css
/* Assuming the filename is "new-css-file.css" */

/* index.css */
@import "./new-css-file.css";

/* ... Rest of the file ... */
```

The `index.css` file is loaded in the generated popup and options HTML file. So importing new CSS files here will automatically load them the popup/options.

