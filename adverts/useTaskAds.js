import { adController } from "./adController";
import { Monetag } from "./monetagService";

export const useTaskAds = (navigate) => {
  const handleRunTask = async (taskId) => {
    adController.recordTask();

    const shouldShowAd = adController.shouldShowAd();

    if (shouldShowAd) {
      const adTriggered = Monetag.showInterstitial();

      if (adTriggered) {
        adController.recordAdShown();

        // give ad time to open properly
        setTimeout(() => {
          navigate(`/task/watch/${taskId}`);
        }, 1800);
      } else {
        // fallback if ad didn't trigger
        navigate(`/task/watch/${taskId}`);
      }
    } else {
      navigate(`/task/watch/${taskId}`);
    }
  };

  return { handleRunTask };
};