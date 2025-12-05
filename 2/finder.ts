export function findInvalid(input: string, matcher: (x: string) => boolean): number[] {
  return input
    .split(",")
    .flatMap((range: string) => {
      const [from, to] = range.split("-");
      return findRepeating(Number(from), Number(to), matcher);
    })
}

export function findRepeating(from: number, to: number, matcher: (x: string) => boolean): number[] {
  let repeating: number[] = []
  
  for(let x = from; x <= to; x++) {
    if(isRepeatingTwice(x.toString())) {
      repeating.push(x);
    }
  }

  return repeating;
}

export function isRepeatingTwice(x: string): boolean {
  if(x.length === 0 || x.length % 2 !== 0) {
    return false;
  }
  const a = x.slice(0, x.length/2);
  const b = x.slice(x.length/2);

  return isRepeating([a,b]);
}

export function isRepeating<T>(x: T[]): boolean {
  const set = new Set(x);
  return set.size === 1;
}

export function isRepeatingAtAll(x: string): boolean {
  if(x.length === 0 || x.length === 1) {
    return false;
  }

  for(let i = 2; i <= x.length; i ++) {
    if(x.length % i == 0) {
      let chunks = [];
      for(let j = 0; j < i; j++) {
        chunks.push(x.slice(j*(x.length/i), (j+1)*(x.length/i)));
      }
      if(isRepeating(chunks)) {
        return true;
      }
    }
  }

  return false;
}

// starts
// x.length = 6; i = 2; j = 0; x.length/i = 3; j*(x.length/i) = 0
// x.length = 6; i = 2; j = 1; x.length/i = 3; j*(x.length/i) = 3
// x.length = 6; i = 2; j = 2; x.length/i = 3; j*(x.length/i) = 6
// x.length = 6; i = 2; j = 3; x.length/i = 3; j*(x.length/i) = 9
// x.length = 6; i = 2; j = 4; x.length/i = 3; j*(x.length/i) = 12

// ends
// x.length = 6; i = 2; j = 0; x.length/i = 3;  : 3
// x.length = 6; i = 2; j = 1; x.length/i = 3;  : 6
// x.length = 6; i = 2; j = 2; x.length/i = 3;  : 6
// x.length = 6; i = 2; j = 3; x.length/i = 3;  : 8
// x.length = 6; i = 2; j = 4; x.length/i = 3;  : 10