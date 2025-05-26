import { RewardedAd, RewardedAdEventType, TestIds, AdEventType } from 'react-native-google-mobile-ads';

export async function showRewardedAd(onReward: () => void) {
  const adUnitId = TestIds.REWARDED; // 'ca-app-pub-3940256099942544/5224354917'
  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const onEarnReward = () => {
    onReward();
    rewarded.removeAllListeners();
  };

  rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, onEarnReward);
  rewarded.addAdEventListener(AdEventType.CLOSED, () => {
    rewarded.removeAllListeners();
  });

  // 광고 로드 실패 시 콘솔 및 alert로 표시
  rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
    console.log('광고 로드 실패:', error);
    rewarded.removeAllListeners();
    alert('광고를 불러오지 못했습니다. 네트워크 상태를 확인하거나, 잠시 후 다시 시도해 주세요.');
  });

  rewarded.load();
  rewarded.addAdEventListener(AdEventType.LOADED, () => {
    rewarded.show();
  });
} 