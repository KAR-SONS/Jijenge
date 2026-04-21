import { adController } from "./adController";
import { Monetag } from "./monetagService";

export const useTaskAds = (navigate) => {
  const handleRunTask = async (taskId) => {
    adController.recordTask();

    const shouldShowAd = adController.shouldShowAd();

    if (shouldShowAd) {
      adController.recordAdShown();

      // REAL Monetag ad trigger
      Monetag.showInterstitial();

      // small delay so ad registers
      setTimeout(() => {
        navigate(`/task/watch/${taskId}`);
      }, 1500);
    } else {
      navigate(`/task/watch/${taskId}`);
    }
  };

  return { handleRunTask };
};