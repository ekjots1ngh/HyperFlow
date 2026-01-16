export const Analytics = {
  track: (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window === "undefined") {
      return;
    }

    if ((window as unknown as { gtag?: (type: string, event: string, options?: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (type: string, event: string, options?: Record<string, unknown>) => void }).gtag(
        "event",
        eventName,
        properties,
      );
    }

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log("\uD83D\uDCCA Analytics:", eventName, properties);
    }
  },

  page: (pageName: string) => {
    if (typeof window === "undefined") {
      return;
    }

    if ((window as unknown as { gtag?: (type: string, event: string, options?: Record<string, unknown>) => void }).gtag) {
      (window as unknown as { gtag: (type: string, event: string, options?: Record<string, unknown>) => void }).gtag(
        "event",
        "page_view",
        {
          page_title: pageName,
          page_location: window.location.href,
        },
      );
    }
  },
};

export const trackBridgeStart = (fromChain: number, amount: string) => {
  Analytics.track("bridge_start", { fromChain, amount });
};

export const trackBridgeComplete = (txHash: string, amount: string) => {
  Analytics.track("bridge_complete", { txHash, amount });
};

export const trackBridgeError = (error: string) => {
  Analytics.track("bridge_error", { error });
};

export const trackRouteSelected = (routeIndex: number, tool: string) => {
  Analytics.track("route_selected", { routeIndex, tool });
};
