# \<scl-bay-template>

## What is this?

This is an editor plugin for ComPAS OpenSCD that helps create and manage bay typicals (templates) for SCL files. It provides functionality for defining reusable bay configurations with functions and subfunctions according to IEC 61850 standards.

## Development

### Start Development Server

```bash
npm install
```

```bash
npm start
```

This will start the development server and automatically open the demo at [http://localhost:8000/demo](http://localhost:8000/demo) where you can test the bay template editor.

### Run Tests

```bash
npm test
```

### Watch Tests

```bash
npm test:watch
```

### Linting and Formatting

```bash
npm run lint      # Scan project for linting and formatting errors
npm run format    # Fix linting and formatting errors
```

## Usage

### As OpenSCD Plugin

This editor is designed to be used as a plugin within the OpenSCD ecosystem for creating bay templates:

```javascript
{
  "name": "Bay Template",
  "icon": "edit",
  "active": true,
  "src": "path/to/scl-bay-template.js"
}
```

## Contributing

Please refer to the [CoMPAS Contributing Guide](https://com-pas.github.io/contributing/) for contribution guidelines.

## Authors

- Jakob Vogelsang

## Project Status

This is an active development project. While functional, it should be considered a prototype and used with appropriate caution in production environments.
