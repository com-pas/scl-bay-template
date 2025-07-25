/* eslint-disable import/no-extraneous-dependencies */
import { polyfill } from '@web/dev-server-polyfill';

const filteredLogs = [
  'Running in dev mode',
  'Lit is in dev mode',
  'mwc-list-item scheduled an update',
];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  plugins: [
    polyfill({
      scopedCustomElementRegistry: true,
    }),
  ],

  files: 'dist/**/*.spec.js',

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ['browser', 'development'],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  concurrentBrowsers: 3,

  /** Amount of test files per browser to test concurrently */
  concurrency: 1,
  // See documentation for all available options
});
