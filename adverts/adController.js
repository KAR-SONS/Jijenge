class AdController {
  constructor() {
    this.adsShown = 0;
    this.maxAdsPerSession = 3; // reduce slightly for UX
    this.tasksCompleted = 0;
    this.lastAdTime = 0;
  }

  canShowAd() {
    const now = Date.now();

    // enforce time gap (VERY IMPORTANT)
    const minGap = 15000; // 15 seconds

    return (
      this.adsShown < this.maxAdsPerSession &&
      now - this.lastAdTime > minGap
    );
  }

  shouldShowAd() {
    if (!this.canShowAd()) return false;

    const randomChance = Math.random();

    if (this.tasksCompleted < 2) return randomChance < 0.2;
    if (this.tasksCompleted < 5) return randomChance < 0.35;

    return randomChance < 0.5;
  }

  recordAdShown() {
    this.adsShown += 1;
    this.lastAdTime = Date.now();
  }

  recordTask() {
    this.tasksCompleted += 1;
  }

  resetSession() {
    this.adsShown = 0;
    this.tasksCompleted = 0;
    this.lastAdTime = 0;
  }
}

export const adController = new AdController();