export function handleTap(
  tapTimesRef: React.RefObject<number[]>,
  setBpm: React.Dispatch<React.SetStateAction<number>>
) {
  const now = performance.now();

  if (
    tapTimesRef.current.length > 0 &&
    now - tapTimesRef.current.at(-1)! > 2000
  ) {
    tapTimesRef.current = [];
  }

  tapTimesRef.current.push(now);
  if (tapTimesRef.current.length > 4) {
    tapTimesRef.current.shift();
  }

  if (tapTimesRef.current.length >= 2) {
    const intervals = [];
    for (let i = 1; i < tapTimesRef.current.length; i++) {
      intervals.push(tapTimesRef.current[i] - tapTimesRef.current[i - 1]);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const tappedBpm = Math.round(60000 / avgInterval);

    if (tappedBpm <= 30) {
      setBpm(30);
    } else if (tappedBpm >= 240) {
      setBpm(240);
    } else {
      setBpm(tappedBpm);
    }
  }
}
