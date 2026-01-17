import { describe, expect, test } from "vitest";
import { countMatches, endsAt0, passesOrEndsAt0, transformInput } from "./counter.js";
import { getInput } from "../inputs.js";

describe("transformInput ", () => {
  test("transforms", () => {
    const result = transformInput("R1\nR1\nL50\nL99\nR1234");
    expect(result).toEqual([1,1,-50,-99,1234])
  });
});

describe("countMatches", () => {
  describe("passesOrEndsAt0", () => {
    describe("to the right", () => {
      test("math floor", () => {
        expect(Math.floor(-50/100)).toEqual(-1)
      });
      test.each([
        [-250,50,3],
        [-50,50,1],
        [50,100,1],
        [50,150,1],
        [50,250,2],
        [-1,0,1],
        [0,-1,1],
        [250, -50, 3]
      ])("%i -> %i: %i", (start, end, expected) =>{
        const result = passesOrEndsAt0(start, end);
        expect(result).toBe(expected);
      })
    });

    test("advent of code sample input", () => {
      const raw = "L68\nL30\nR48\nL5\nR60\nL55\nL1\nL99\nR14\nL82";
      const input = transformInput(raw);
      const result = countMatches(50, input, passesOrEndsAt0);
      expect(result).toBe(6);
    });


    test("advent of code input", async () => {
      const raw = await getInput(1);
      const input = transformInput(raw);
      const result = countMatches(50, input, passesOrEndsAt0);
      expect(result).toBe(6649);
    })
  });

  describe("endsAt0", () => {
    test("when going to 0 and then 100", () => {
      const result = countMatches(50, [-30, -20, 100], endsAt0);
      
      expect(result).toBe(2);
    });
    
    test("when going to -50 and then -100", () => {
      const result = countMatches(50, [-30, -20, -100], endsAt0);
      
      expect(result).toBe(2);
    });
    
    test("when going to 0", () => {
      const result = countMatches(50, [-50], endsAt0);
      
      expect(result).toBe(1);
    });
    
    test("when going to -100", () => {
      const result = countMatches(50, [-150], endsAt0);
      
      expect(result).toBe(1);
    });
    
    
    test("when going to 100", () => {
      const result = countMatches(50, [50], endsAt0);
      
      expect(result).toBe(1);
    });
    
    test("when going to 200", () => {
      const result = countMatches(50, [150], endsAt0);
      
      expect(result).toBe(1);
    });

    test("advent of code small test", () => {
      const input = [-68, -30, 48, -5, 60, -55, -1, -99, 14, -82];

      const result = countMatches(50, input, endsAt0);
      expect(result).toBe(3);
    });

    test("advent of code input", async () => {
      const raw = await getInput(1);
      const input = transformInput(raw);
      const result = countMatches(50, input, endsAt0);
      expect(result).toBe(1129);
    })
  });
});
