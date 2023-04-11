# GitHub Autocomplete

GitHub autocomplete component in React / TypeScript

## Brief
Your task is to create a reusable and self-contained autocomplete
component, which can fetch matching users and repositories for
a given string of characters.

## Requirements
- Don’t use an existing autocomplete library (even if in real life this would be preferred).
- Minimal chars number to initialize search: 3.
- Result items are combined and displayed alphabetically using repository and profile name as ordering keys.
- Number of result items should be limited to 50 per request.
- The component should give visual feedback for when the data is being fetched, the results are empty, or the request resulted in an error.
- The component supports keyboard strokes (up and down arrows to browse the results, enter to open a new tab with the repository/user page).
- The solution should also display a meaningful snippet of your ability to test the code.

Techstack: React, TypeScript.

## Setup
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run dev
```


### Test component
```bash
npm run test
```

### Build the app for production
```bash
npm run build
npm run preview
```

