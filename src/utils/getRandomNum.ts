const getRandomNum = (now: number, total: number): number => {
  const result = Math.floor(Math.random() * total);
  return result === now ? getRandomNum(now, total) : result;
};

export default getRandomNum;
