import type { Part } from "#shared/runner.ts";

const testInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`.trim();

const search = "XMAS".split("");

type Row = string[];
type Grid = Row[];

interface IterationData {
	grid: Grid;
	row: Row;
	x: number;
	y: number;
}

function iterate(input: string, callback: (data: IterationData) => void) {
	const grid = input.split("\n").map((r) => r.split(""));
	grid.forEach((row, y) => row.forEach((_, x) => callback({ grid, row, x, y })));
}

export const part1: Part = (input) => {
	const fullSearch = [search, search.toReversed()];
	let count = 0;

	iterate(input, ({ grid, row, x, y }) => {
		const matches = [
			fullSearch.some((s) => s.every((char, idx) => row[x + idx] === char)),
			fullSearch.some((s) => s.every((char, idx) => grid[y + idx]?.[x] === char)),
			fullSearch.some((s) => s.every((char, idx) => grid[y + idx]?.[x + idx] === char)),
			fullSearch.some((s) => s.every((char, idx) => grid[y + idx]?.[x - idx] === char)),
		].filter((m) => m);

		count += matches.length;
	});

	return count;
};

export const part2: Part = (input) => {
	const fullSearch = [search.slice(1), search.slice(1).toReversed()];
	let count = 0;

	iterate(input, ({ grid, x, y }) => {
		if (
			fullSearch.some((s) => s.every((char, idx) => grid[y + idx]?.[x + idx] === char))
			&& fullSearch.some((s) => s.every((char, idx) => grid[y + idx]?.[x + 2 - idx] === char))
		) count++;
	});

	return count;
};
