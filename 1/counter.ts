
export function transformInput(raw: string): number[] {
  return raw.split("\n").map(d => d.charAt(0) === "L" ? -1 * Number(d.slice(1)) : Number(d.slice(1)));
}

export function endsAt0(start: number, end: number): 1 | 0 {
  if(end%100 === 0) {
    return 1;
  } else {
    return 0;
  }
}

export function passesOrEndsAt0(start: number, end: number): number {
  let count = 0;

  if(start < end) {
    for(let i = start; i <= end; i++) {
      if(i % 100 === 0) {
        count ++
      }
    }
  } else {
    for(let i = start; i >= end; i--) {
      if(i % 100 === 0) {
        count ++
      }
    }
  }
  
  return count;
}

export function countMatches(startingPosition: number, collection: number[], rule: (start: number, end: number) => number) {
  let position = startingPosition
  let count = 0;

  collection.forEach(move => {
    count += rule(position, position += move);
  });

  return count;
}
