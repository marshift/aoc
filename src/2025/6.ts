import type { Part } from "#shared/runner.ts";

const testInput = `123 328  51 64
 45 64  387 23
  6 98  215 314
*   +   *   +  `;

const parse = (input: string) => input.split("\n").map((row) => row.split(" ").filter((i) => i.length !== 0));

export const part1: Part = (input) => {
	const grid = parse(input);
	const transposed = grid[0].map((_, i) => grid.map((row) => row[i]));
	const problems = transposed.map((row) => row.join(row.pop()));
	return problems.map(eval).reduce((a, b) => a + b);
};

export const part2: Part = (input) => {
};
