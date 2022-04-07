const timeToAnswer = (timeout, setinterval) => {
  const timeOutTime = 30000;
  setTimeout(timeout, timeOutTime);
  const intervalTime = 1000;
  const timeOut = setInterval(setinterval, intervalTime);
  return timeOut;
};

export default timeToAnswer;
