export function findInvalid(input: string): number[] {
  return input
    .split(",")
    .flatMap((range: string) => {
      const [from, to] = range.split("-");
      return findRepeating(Number(from), Number(to));
    })
}

export function findRepeating(from: number, to: number): number[] {
  let repeating: number[] = []
  
  for(let x = from; x <= to; x++) {
    if(isRepeating(x.toString())) {
      repeating.push(x);
    }
  }

  return repeating;
}

export function isRepeating(x: string): boolean {
  if(x.length === 0 || x.length % 2 !== 0) {
    return false;
  }
  const a = x.slice(0, x.length/2);
  const b = x.slice(x.length/2);

  return a === b;
}
