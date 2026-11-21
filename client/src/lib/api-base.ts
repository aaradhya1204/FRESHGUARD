/**
 * Returns the base URL for API requests.
 *
 * When running inside a Capacitor native shell the web assets are served from
 * a local origin (capacitor://localhost or https://localhost) so relative
 * fetch("/api/...") calls would not reach the backend.  In that case we
 * prefix every request with the deployed server URL.
 *
 * In a normal browser (dev or production) the API is on the same origin, so
 * we return an empty string and let relative paths work as-is.
 */

const isNative = (): boolean => {
  // Capacitor injects a global object; if it exists we're in a native shell.
  return typeof (window as any)?.Capacitor !== 'undefined';
};

export const API_BASE: string = isNative()
  ? 'https://expironguard.onrender.com'
  : '';
