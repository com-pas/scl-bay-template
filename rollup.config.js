import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {importMetaAssets}  from '@web/rollup-plugin-import-meta-assets';


export default {
  input: './scl-bay-template.ts',
  output: {
    sourcemap: true,        // Add source map to build output
    format:'es',            // ES module type export
    dir: 'dist',            // The build output folder
    // preserveModules: true,  // Keep directory structure and files
  },
  preserveEntrySignatures: 'strict', // leaves export of the plugin entry point
  context: 'window',
  plugins: [
    /** Resolve bare module imports */
    nodeResolve(),
    typescript(),
    importMetaAssets()
   ],
};
