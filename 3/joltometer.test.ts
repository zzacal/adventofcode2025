import { getInput } from "../inputs.js";
import { findFirstMax, findLargetTwoDigitCombo } from "./joltometer.js";
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
});
