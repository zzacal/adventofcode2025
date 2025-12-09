
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
