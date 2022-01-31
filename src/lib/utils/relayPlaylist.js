export default function completeChecker(time) {
  const nowTime = new Date();
  const postTime = new Date(time);
  const betweenTime = Math.floor((nowTime.getTime() - postTime.getTime()) / 1000 / 60 / 60 / 24);
  return betweenTime >= 0 && betweenTime < 4;
}
