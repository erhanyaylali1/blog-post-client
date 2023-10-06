const getRelativeTime = (time) => {
  const time_diff = (new Date(time).getTime() - Date.now()) / (1000 * 60);
  const formatter = new Intl.RelativeTimeFormat();
  const relative_time =
    time_diff > -60 ? 'minute' : time_diff > -1440 ? 'hour' : 'day';
  const relative_time_diff =
    time_diff > -60 ? 1 : time_diff > -1440 ? 60 : 60 * 24;
  const time_ago = formatter.format(
    Math.round(time_diff / relative_time_diff),
    relative_time
  );
  return time_ago;
};

export default getRelativeTime;
