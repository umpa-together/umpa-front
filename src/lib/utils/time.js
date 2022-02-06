export default function timeConverter(time) {
  const now = new Date();
  const postTime = new Date(time);
  const betweenTime = Math.floor((now.getTime() - postTime.getTime()) / 1000 / 60);
  if (betweenTime < 1) {
    return '방금전';
  }
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }
  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }
  const betweenTimeDay = Math.floor(betweenTimeHour / 24);
  if (betweenTimeDay < 31) {
    return `${betweenTimeDay}일전`;
  }
  const betweenMonth = Math.floor(betweenTimeDay / 30);
  if (betweenMonth < 12) {
    return `${betweenMonth}달전`;
  }
  const betweenYear = Math.floor(betweenMonth / 12);
  return `${betweenYear}년전`;
}
