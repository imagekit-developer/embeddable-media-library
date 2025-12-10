# 2.4.0

- feat: Added ability to update `mlSettings` and callback dynamically via `open()` method
- feat: Added loading state with spinner overlay during iframe reload
- refactor: Refactored code for improved structure and readability

# 2.3.1

- fix: Added message source validation to prevent cross-origin message spoofing
- feat: Added clipboard-write permission to iframe allow attribute
- refactor: Store iframe reference to avoid DOM queries

# 2.3.0

- feat: Added `loginViaSSO` and `widgetImagekitId` parameters in `mlSettings`.
- chore: Included the `samples/saml-auth` project for testing purposes.
- docs: Added example in docs

# 2.2.0

- feat: Added support for custom query parameters via `queryParams` option in `mlSettings`
- improvement: Refactored URL generation to use URLSearchParams for better parameter handling
- docs: Added example in docs

# 2.1.2

- fix: Fixed 'FileTypeValue' enum

# 2.1.1

- feat: Added support for controlling the close and insert button visibility states

# 2.1.0

- fix: Added allow-downloads permission to iframe sandbox attributes
- feat: Added open() and destroy() functions for better widget lifecycle management
- improvement: Improved event listener management and memory cleanup

# 2.0.0

- Introduced 'mlSettings' parameter in plugin options
- Added Typescript support

# 1.0.4

- Fix: Allow popups for google login