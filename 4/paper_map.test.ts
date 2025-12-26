import { describe, expect, test } from "vitest";
import { countAccessibleRolls, getAdjacentCoords, sumAdjacents, transformInput } from "./paper_map.js";
import { getInput } from "../inputs.js";

describe("getAdjacentCoords", () => {
  test("it gets adjacent of non edge cases", () => {
    const coords11 = getAdjacentCoords(1, 1);
    expect(coords11).toEqual([
      [0, 0], [1, 0], [2, 0], 
      [0, 1],         [2, 1], 
      [0, 2], [1, 2], [2, 2]]);
  });
});

describe("sumAdjacents", () => {
  test("it returns sum of adjacents", () => {
    const input = [[0, 1, 1], [0, 1, 1], [1, 1, 1]];
    const target: [number, number] = [1,1];
    const sum = sumAdjacents(input, target);
    expect(sum).toEqual(6);
  })

  test("it returns sum of adjacents when edge case", () => {
    const input = [[0, 1, 1], [0, 1, 1], [1, 1, 1]];
    const target: [number, number] = [0,0];
    const sum = sumAdjacents(input, target);
    expect(sum).toEqual(2);
  })

  test("it returns sum of adjacents when edge case on the right", () => {
    const input = [[0, 1, 1], [0, 1, 1], [1, 1, 1]];
    const target: [number, number] = [2,2];
    const sum = sumAdjacents(input, target);
    expect(sum).toEqual(3);
  })
});

describe("countAccessibleRolls", () => {
  test("returns how many are accessible", () => {
    const input = [[0, 1, 1], [0, 1, 1], [1, 1, 1]];
    const accessible = countAccessibleRolls(input);

    expect(accessible).toBe(4);
  });
});

describe("transformInput", () => {
  test("transforms string inputs to number array of arrays", () => {
    const input = 
`..@
@@@
@@@`;

    const transformed = transformInput(input);
    expect(transformed).toEqual([[0, 1, 1], [0, 1, 1], [1, 1, 1]]);
  });
});

describe("adventofcode", () => {
  test("day 1 exercise 1", async () => {
    const input = await getInput(4);
    const transformed = transformInput(input);
    const accessible = countAccessibleRolls(transformed);
    expect(accessible).toBe(1467);
  });
});
