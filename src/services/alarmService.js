const playSound = (soundFile) => {
  const audio = new Audio(soundFile);
  audio.play();
};

const alarmService = {
  playProfitSound: () => playSound("/sounds/profit-sound.wav"),
  playOrderPlaceSound: () => playSound("/sounds/order-place-sound.wav"),
  playLossSound: () => playSound("/sounds/loss-sound.wav"),
  playTrailStoplossSound: () => playSound("/sounds/trail-stoploss-sound.wav"),
};

export default alarmService;
