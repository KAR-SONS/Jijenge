export const Monetag = {
  zoneId: "10906824",

  showInterstitial() {
    const fnName = `show_${this.zoneId}`;

    try {
      if (typeof window !== "undefined" && typeof window[fnName] === "function") {
        window[fnName]();
        return true;
      } else {
        console.warn("Monetag not ready, retrying...");

        // retry once after delay
        setTimeout(() => {
          if (typeof window[fnName] === "function") {
            window[fnName]();
          }
        }, 1000);

        return false;
      }
    } catch (e) {
      console.error("Monetag error:", e);
      return false;
    }
  }
};