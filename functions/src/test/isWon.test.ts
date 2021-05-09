import { isWon } from "../services/game.service";

test("\n|X| | |\n| | | |\n| | | |\nfalse", () => {
  expect(isWon(3, [0], 0)).toBe(false);
});

test("\n|X|X|X|\n| | | |\n| | | |\ntrue", () => {
  expect(isWon(3, [0, 1, 2], 0)).toBe(true);
});

test("\n|X|X| |\n|X| | |\n| | | |\nfalse", () => {
    expect(isWon(3, [0, 1, 3], 0)).toBe(false);
  });

test("\n|X| |X|\n| |X| |\n| | | |\nfalse", () => {
  expect(isWon(3, [0, 2, 4], 4)).toBe(false);
});
