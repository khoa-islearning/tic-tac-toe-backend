import { isWon } from "../services/game.service";



test("\n| |x| |\n| |X| |\n| |x| |\ntrue", () => {
  expect(isWon(3, [1, 4, 7], 4)).toBe(true);
});

test("\n| |X| |\n| |x| |\n| |x| |\ntrue", () => {
  expect(isWon(3, [1, 4, 7], 1)).toBe(true);
});

test("\n| |x| |\n| |x| |\n| |X| |\ntrue", () => {
  expect(isWon(3, [1, 4, 7], 7)).toBe(true);
});

test("\n|x| | |\n| |X| |\n| | |x|\ntrue", () => {
  expect(isWon(3, [0, 4, 8], 4)).toBe(true);
});
test("\n|X| | |\n| |x| |\n| | |x|\ntrue", () => {
  expect(isWon(3, [0, 4, 8], 0)).toBe(true);
});
test("\n|x| | |\n| |x| |\n| | |X|\ntrue", () => {
  expect(isWon(3, [0, 4, 8], 8)).toBe(true);
});

test("\n| | |x|\n| |X| |\n|x| | |\ntrue", () => {
  expect(isWon(3, [2, 4, 6], 4)).toBe(true);
});

test("\n| | |X|\n| |x| |\n|x| | |\ntrue", () => {
  expect(isWon(3, [2, 4, 6], 2)).toBe(true);
});

test("\n| | |x|\n| |x| |\n|X| | |\ntrue", () => {
  expect(isWon(3, [2, 4, 6], 6)).toBe(true);
});


test("\n| | | |\n|x|X|x|\n| | | |\ntrue", () => {
  expect(isWon(3, [3, 4, 5], 4)).toBe(true);
});

test("\n| | | |\n|X|x|x|\n| | | |\ntrue", () => {
  expect(isWon(3, [3, 4, 5], 3)).toBe(true);
});

test("\n| | | |\n|x|x|X|\n| | | |\ntrue", () => {
  expect(isWon(3, [3, 4, 5], 5)).toBe(true);
});


test("\n|x| |x|\n| |X| |\n| | | |\nfalse", () => {
  expect(isWon(3, [0, 2, 4], 4)).toBe(false);
});

test("\n| | | |\n| |X| |\n|x| |x|\nfalse", () => {
  expect(isWon(3, [6, 4, 8], 4)).toBe(false);
});

test("\n|x| | |\n| |X|x|\n| | | |\nfalse", () => {
  expect(isWon(3, [0, 4, 5], 4)).toBe(false);
});

test("\n|x| | |\n| |X| |\n| |x| |\nfalse", () => {
  expect(isWon(3, [0, 4, 7], 4)).toBe(false);
});

