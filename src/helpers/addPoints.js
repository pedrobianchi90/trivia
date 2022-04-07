const addPoints = (correctAnswers, answerTime) => {
  const obj = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  const currentTimeAndAnswer = [answerTime[answerTime.length - 1],
    correctAnswers[correctAnswers.length - 1]];
  const defaultPoint = 10;
  const point = defaultPoint + (currentTimeAndAnswer[0]
      * obj[currentTimeAndAnswer[1].difficulty]);
  return point;
};

export default addPoints;
