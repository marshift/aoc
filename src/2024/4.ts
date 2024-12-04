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

// The argument order of this callback is a bit weird but it lets me not include the row in Part 2 :p
function iterate(input: string, callback: (grid: string[][], x: number, y: number, row: string[]) => void) {
	const grid = input.split("\n").map((r) => r.split(""));
	grid.forEach((row, y) => {
		row.forEach((_, x) => {
			callback(grid, x, y, row);
		});
	});
}

export const part1: Part = (input) => {
	const fullSearch = [search, search.toReversed()];
	let count = 0;

	iterate(input, (grid, x, y, row) => {
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

	iterate(input, (grid, x, y) => {
		if (
			fullSearch.some((s) => s.every((char, idx) => grid[y + idx]?.[x + idx] === char))
			&& fullSearch.some((s) => s.every((char, idx) => grid[y + idx]?.[x + 2 - idx] === char))
		) count++;
	});

	return count;
};
