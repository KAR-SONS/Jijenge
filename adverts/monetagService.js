export const Monetag = {
  isReady: false,

  init() {
    // check if script loaded
    this.isReady = typeof window !== "undefined" && !!window.Monetag;
  },

  showInterstitial() {
    if (!this.isReady) {
      console.warn("Monetag not ready yet");
      return;
    }

    try {
      // common Monetag trigger method (varies by format)
      window.Monetag.show();
    } catch (e) {
      console.log("Monetag fallback trigger");
    }
  },

  showPopunder() {
    try {
      window.open(window.location.href);
    } catch (e) {}
  }
};