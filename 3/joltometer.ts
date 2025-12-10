
export function findLargetTwoDigitCombo(numbers: number[]) {
  // 1. Find the max of everything but the last digit
  const [dig1, dig1i] = findFirstMax(numbers.slice(0, numbers.length - 1));
  const [dig2] = findFirstMax(numbers.slice(dig1i+1));

  return Number(dig1.toString() + dig2.toString());
}

export function findFirstMax(numbers: number[]) {
  return numbers.reduce<[number, number]>((previousValue: [number, number], currentValue: number, currentIndex: number, a: number[]) => {
    const [max, maxi] = previousValue;
    if(currentValue > max) {
      return [currentValue, currentIndex];
    }

    return previousValue;
  }, [0,0]);
}

export function numerify(numbers: number[]) {
  return Number(numbers.map(n => n.toString()).join(""))
}

export function findMaxCombo(numbers: number[], digits: number): number[] {
  if(numbers.length <= digits) {
    return numbers;
  }
  // pool = [3, 4, 5, 1, 2, 3, 5]; digits = 3;
  // 0: pool.length = 7; digits = 3; poolEnd = 5; max = 5; pool = [1, 2, 3, 5]
  // 1: pool.length = 7; digits = 3; poolEnd = 6; max = 3; pool = [5]
  // 2: pool.length = 7; digits = 3; poolEnd = 7; max = 5; pool = []
  // answer = [5,3,5]

  let answer: number[] = [];
  let genPool = numbers;

  for(let i = 0; i < digits; i ++)
  {
    const poolEnd = genPool.length - digits + 1 + i;
    const pool = genPool.slice(0, poolEnd);
    const [max, maxi] = findFirstMax(pool);
    answer.push(max);
    genPool = genPool.slice(maxi + 1);
  }
  return answer;
}

export const findNDigitMax = (digits: number) => (numbers: number[]) => findMaxCombo(numbers, digits);
