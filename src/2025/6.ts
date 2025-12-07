import type { Part } from "#shared/runner.ts";

const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const transpose = (grid: string[][]) => grid[0].map((_, i) => grid.map((row) => row[i]));
const total = (problems: string[]) => problems.map(eval).reduce((prev, curr) => prev + curr);

export const part1: Part = (input) => {
	const grid = input.split("\n").map((row) => row.split(" ").filter((i) => i.length !== 0));
	const problems = transpose(grid).map((row) => row.join(row.pop()));
	return total(problems);
};

export const part2: Part = (input) => {
	const chars = input.split("\n").map((line) => line.split(""));
	const operators = chars.pop()!.filter((c) => c !== " ");

	const chunks = transpose(chars).reduce((acc, curr) => {
		if (curr.every((c) => c === " ")) acc.push([]);
		else acc[acc.length - 1].unshift(curr.join("").trim());
		return acc;
	}, [[]] as string[][]);

	const problems = chunks.map((digits, idx) => digits.join(operators[idx]));
	return total(problems);
};
