
// coords = string[x,y]

// [[1,1], [3,1]]
export function getAdjacentCoords(x: number, y: number): [number, number][] {
  let results: [number, number][] = [];

  // up-left
  results.push([x-1, y-1]); // [-1, -1]
  
  // up-center
  results.push([x, y-1]); // [0, -1]

  // up-right
  results.push([x+1, y-1]); // [1, -1]

  // left
  results.push([x-1, y]); // [1, 0]

  // right
  results.push([x+1, y]);// [1, 0]

  // below-left
  results.push([x-1, y+1]);

  // below-center
  results.push([x, y+1]);
  
  // below-right
  results.push([x+1, y+1]);

  return results;
}


// input = [[0, 0], [1, 0], [2, 0], ; coord = [1,1]; sum = 
        // [0, 1], [1, 1], [2, 1], 
        // [0, 2], [1, 2], [2, 2]]
export function sumAdjacents(input: number[][], target: [number, number]): number {
  const adjacentCoords = getAdjacentCoords(target[0], target[1]);
  const sum = adjacentCoords
    .map(([x, y]) => input[x]?.[y] ?? 0)
    .reduce((acc: number, val) => acc + (val ?? 0), 0);
  return sum;
}

export function countAccessibleRolls(input: number[][]): number {
  const criteria = (adjacent: number) => adjacent < 4;
  let counter = 0;

  for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
      if(input[x]?.[y] === 1) {
        const adjacentSum = sumAdjacents(input, [x, y]);
        if (criteria(adjacentSum)) {
          counter++;
        }
      }
    }
  }
  
  // go through all indexes
    // see if they match criteria
      // if true, counter ++
  return counter;
}

// input: 
// ..@
// @@@
// @@@

// result:
// [[0, 1, 1], [0, 1, 1], [1, 1, 1]]
export function transformInput(input: string): number[][] {
  const yArrays = input.split("\n");
  const result = yArrays.map(yArr => yArr.split("").map(y => y === "." ? 0 : 1));
  
    // Rotate 90° clockwise to match expected result
  const n = result.length;
  
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [result[i][j], result[j][i]] = [result[j][i], result[i][j]];
    }
  }
    
  return result;
}

export function rotateInPlace(grid: number[][]): void {
  const n = grid.length;
  
  // Transpose (assumes square grid)
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [grid[i][j], grid[j][i]] = [grid[j][i], grid[i][j]];
    }
  }
  
  // Reverse each row
  for (let i = 0; i < n; i++) {
    grid[i].reverse();
  }
}
