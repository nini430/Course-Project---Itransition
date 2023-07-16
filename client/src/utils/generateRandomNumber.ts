const generateRandomNumber = (min: number, max: number) => {
  const randomNum = Math.random();
  const customRandomNum = Math.floor(randomNum * (max - min + 1)) + min;
  return customRandomNum;
};

export default generateRandomNumber;
