'use client';

import { useEffect } from 'react';

const EXTENSION_ORIGIN = 'chrome-extension://cpojfbodiccabbabgimdeohkkpjfpbnf/';
const EXTENSION_MESSAGE_SIGNATURE = 'chrome.runtime.sendMessage() called from a webpage must specify an Extension ID';

/**
 * Swallows browser errors injected by third-party extensions so the dev overlay stays clean.
 */
export function ExtensionErrorSilencer() {
  useEffect(() => {
    const suppressExtensionError = (event: ErrorEvent) => {
      const message = typeof event.message === 'string' ? event.message : event.error?.message ?? '';
      const filename = typeof event.filename === 'string' ? event.filename : '';

      const isTargetError =
        (message && message.includes(EXTENSION_MESSAGE_SIGNATURE)) || filename.startsWith(EXTENSION_ORIGIN);

      if (isTargetError) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
      }
    };

    window.addEventListener('error', suppressExtensionError, true);

    return () => {
      window.removeEventListener('error', suppressExtensionError, true);
    };
  }, []);

  useEffect(() => {
    const suppressUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = typeof event.reason?.message === 'string' ? event.reason.message : String(event.reason ?? '');
      const stack = typeof event.reason?.stack === 'string' ? event.reason.stack : '';

      const isTargetError = message.includes(EXTENSION_MESSAGE_SIGNATURE) || stack.includes(EXTENSION_ORIGIN);

      if (isTargetError) {
        event.preventDefault();
        event.stopImmediatePropagation?.();
      }
    };

    window.addEventListener('unhandledrejection', suppressUnhandledRejection, true);

    return () => {
      window.removeEventListener('unhandledrejection', suppressUnhandledRejection, true);
    };
  }, []);

  return null;
}
