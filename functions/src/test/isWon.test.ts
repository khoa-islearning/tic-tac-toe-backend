import { isWon } from "../services/game.service";

test("\n|X| | |\n| |X| |\n| | |X|\ntrue", () => {
  expect(isWon(3, [0, 4, 8], 4)).toBe(true);
});

test("\n| | |X|\n| |X| |\n|X| | |\ntrue", () => {
  expect(isWon(3, [2, 4, 6], 4)).toBe(true);
});

test("\n| |X| |\n| |X| |\n| |x| |\ntrue", () => {
  expect(isWon(3, [1, 4, 7], 4)).toBe(true);
});

test("\n| | | |\n|X|X|X|\n| | | |\ntrue", () => {
  expect(isWon(3, [3, 4, 5], 4)).toBe(true);
});

test("\n|X| |X|\n| |X| |\n| | | |\nfalse", () => {
  expect(isWon(3, [0, 2, 4], 4)).toBe(false);
});

test("\n| | | |\n| |X| |\n|X| |X|\nfalse", () => {
  expect(isWon(3, [6, 4, 8], 4)).toBe(false);
});

test("\n|X| | |\n| |X|X|\n| | | |\nfalse", () => {
  expect(isWon(3, [0, 4, 5], 4)).toBe(false);
});

test("\n|X| | |\n| |X| |\n| |X| |\nfalse", () => {
  expect(isWon(3, [0, 4, 7], 4)).toBe(false);
});

