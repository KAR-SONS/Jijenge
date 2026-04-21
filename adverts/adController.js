class AdController {
  constructor() {
    this.adsShown = 0;
    this.maxAdsPerSession = 4; // safe limit for Monetag
    this.tasksCompleted = 0;
  }

  canShowAd() {
    return this.adsShown < this.maxAdsPerSession;
  }

  shouldShowAd() {
    if (!this.canShowAd()) return false;

    // smart pacing logic
    const randomChance = Math.random();

    // early session = fewer ads
    if (this.tasksCompleted < 2) {
      return randomChance < 0.2; // 20%
    }

    // mid session
    if (this.tasksCompleted < 5) {
      return randomChance < 0.35; // 35%
    }

    // later session
    return randomChance < 0.5; // 50%
  }

  recordAdShown() {
    this.adsShown += 1;
  }

  recordTask() {
    this.tasksCompleted += 1;
  }

  resetSession() {
    this.adsShown = 0;
    this.tasksCompleted = 0;
  }
}

export const adController = new AdController();