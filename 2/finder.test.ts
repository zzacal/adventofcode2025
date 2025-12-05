import { describe, expect, test } from "vitest";
import {findInvalid, findRepeating, isRepeatingAtAll, isRepeatingTwice} from "./finder.js";

describe("isRepeatingTwice", () => {
  test("false when odd number of chars", () => {
    expect(isRepeatingTwice("123")).toBeFalsy();
    expect(isRepeatingTwice("12345")).toBeFalsy();
  })
  test("false when not repeating chars", () => {
    expect(isRepeatingTwice("1233")).toBeFalsy();
    expect(isRepeatingTwice("121212")).toBeFalsy();
  })
  test("true when repeating chars", () => {
    expect(isRepeatingTwice("1313")).toBeTruthy();
    expect(isRepeatingTwice("55")).toBeTruthy();
    expect(isRepeatingTwice("6464")).toBeTruthy();
    expect(isRepeatingTwice("123123")).toBeTruthy();
  })
});

describe("isRepeatingAtAll", () => {
  test("false when not repeating", () => {
    expect(isRepeatingAtAll("12345")).toBeFalsy();
  });
  test("true when repeating twice", () => {
    expect(isRepeatingAtAll("11")).toBeTruthy();
    expect(isRepeatingAtAll("1212")).toBeTruthy();
    expect(isRepeatingAtAll("123123")).toBeTruthy();
  });
  test("true when repeating thrice", () => {
    expect(isRepeatingAtAll("111")).toBeTruthy();
    expect(isRepeatingAtAll("121212")).toBeTruthy();
    expect(isRepeatingAtAll("123123123")).toBeTruthy();
  });
  test("true when repeating frice", () => {
    expect(isRepeatingAtAll("1111")).toBeTruthy();
    expect(isRepeatingAtAll("12121212")).toBeTruthy();
    expect(isRepeatingAtAll("123123123123")).toBeTruthy();
    expect(isRepeatingAtAll("1234123412341234")).toBeTruthy();
  });
});

describe("findRepeating", () => {
  describe("isRepeatingTwice", () => {
    test("finds repeating", () => {
      expect(findRepeating(11, 22, isRepeatingTwice)).toEqual([11,22]);
      expect(findRepeating(95, 115, isRepeatingTwice)).toEqual([99]);
      expect(findRepeating(998,1012, isRepeatingTwice)).toEqual([1010]);
      expect(findRepeating(1188511880,1188511890, isRepeatingTwice)).toEqual([1188511885]);
      expect(findRepeating(222220,222224, isRepeatingTwice)).toEqual([222222]);
      expect(findRepeating(1698522,1698528, isRepeatingTwice)).toEqual([]);
      expect(findRepeating(446443,446449, isRepeatingTwice)).toEqual([446446]);
      expect(findRepeating(38593856,38593862, isRepeatingTwice)).toEqual([38593859]);
    });
  });
});

describe("findInvalid", () => {
  const ranges = "2558912-2663749,1-19,72-85,82984-100358,86-113,193276-237687,51-69,779543-880789,13004-15184,2768-3285,4002-4783,7702278-7841488,7025-8936,5858546565-5858614010,5117615-5149981,4919-5802,411-466,126397-148071,726807-764287,7454079517-7454227234,48548-61680,67606500-67729214,9096-10574,9999972289-10000034826,431250-455032,907442-983179,528410-680303,99990245-100008960,266408-302255,146086945-146212652,9231222-9271517,32295166-32343823,32138-36484,4747426142-4747537765,525-652,333117-414840,13413537-13521859,1626-1972,49829276-50002273,69302-80371,8764571787-8764598967,5552410836-5552545325,660-782,859-1056";

  describe("isRepeatingTwice", () => {
    test("finds invalid", () => {
      expect(findInvalid("11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124", isRepeatingTwice))
        .toEqual([11,22,99,1010,1188511885,222222,446446,38593859]);
      
      
      const sum = findInvalid("11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124", isRepeatingTwice)
        .reduce((a,b) => a+b)
      expect(sum).toBe(1227775554);
    });
    test("finds invalid", () => {      
      const sum = findInvalid(ranges, isRepeatingTwice)
        .reduce((a,b) => a+b)
      expect(sum).toBe(44854383294);
    });
  });

  describe("isRepeatingAtAll", () => {
    test("finds invalid", () => {      
      const sum = findInvalid(ranges, isRepeatingAtAll)
        .reduce((a,b) => a+b)
      expect(sum).toBe(55647141923);
    });
  });
});
