import { getInput } from "../inputs.js";
import { findFirstMax, findLargetTwoDigitCombo, findMaxCombo, findNDigitMax, numerify } from "./joltometer.js";
import { describe, test, expect } from "vitest";

describe("findFirstMax", () => {
  test("finds the first max", () => {
    expect(findFirstMax([1,4,9,5,9,0,2,1,3,9])).toEqual([9,2])
  });
});

describe("findLargetTwoDigitCombo", () => {
  test("finds the largest digit combo", () => {
    expect(findLargetTwoDigitCombo([1,4,9,5,9,0,2,1,3,9])).toEqual(99);
  });
});

describe("findMaxCombo", () => {
  test("returns same when input length equals digits", () => {
    expect(findMaxCombo([1,2,3], 3)).toEqual([1,2,3]);
  });
  test("finds largest n digit combo", () => {
    const pool = [3, 4, 5, 1, 2, 3, 5];
    const digits = 3;
    expect(findMaxCombo(pool, digits)).toEqual([5,3,5]);
  })

  test("finds largest n digit combo when it is pool.shift", () => {
    const pool = [3, 4, 5, 1, 2, 3, 5];
    const digits = 6;
    expect(findMaxCombo(pool, digits)).toEqual([4, 5, 1, 2, 3, 5]);
  })

  test("finds largest n digit combo when it is pool.unshift", () => {
    const pool = [9, 8, 7, 6, 5, 4, 3];
    const digits = 6;
    expect(findMaxCombo(pool, digits)).toEqual([9, 8, 7, 6, 5, 4]);
  })

  test("finds largest n digit combo when it is first input from advent", () => {
    const pool = [
      2, 2, 3, 5, 3, 2, 4, 2, 2, 2, 2, 3, 2, 2, 4, 4, 3, 2, 2, 4, 2, 2, 3, 1, 2,
      2, 3, 4, 2, 5, 1, 3, 3, 3, 3, 4, 3, 4, 2, 5, 2, 4, 3, 3, 6, 3, 4, 4, 3, 1,
      5, 2, 2, 4, 4, 1, 1, 1, 1, 2, 2, 6, 3, 2, 3, 3, 6, 2, 4, 2, 2, 2, 5, 7, 4,
      5, 4, 3, 3, 4, 5, 2, 4, 5, 2, 4, 5, 1, 3, 3, 2, 4, 4, 5, 5, 4, 6, 4, 4, 3,
    ];
    const digits = 12;
    expect(findMaxCombo(pool, digits)).toEqual([ 7, 5, 5, 5, 5, 5, 5, 4, 6, 4, 4, 3 ]);
  });
  test("finds largest n digit combo when it is first sample from advent", () => {
    const pool = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1];
    const digits = 12;
    expect(findMaxCombo(pool, digits)).toEqual([
      9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1,
    ]);
  });
});

describe("adventofcode", () => {
  test("part 1", async () => {
    const input = await getInput(3);
    expect(input).not.toBeNull();
    const inputArr = input.split("\n").map(b => b.split("").map(Number));
    expect(inputArr).not.toBeNull();
    const maxes = inputArr.map(findLargetTwoDigitCombo);
    expect(maxes).not.toBeNull();
    const sum = maxes.reduce((a,b) => a+b)
    expect(sum).toBe(17092);
  });

  test("part 2", async () => {
    const input = await getInput(3);
    const inputArr = input.split("\n").map(b => b.split("").map(Number));
    const maxes = inputArr.map(findNDigitMax(12)).map(c => numerify(c));
    const sum = maxes.reduce((a,b) => a+b)
    expect(sum).toBe(170147128753455);
  });
});
