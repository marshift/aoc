import type { Part } from "#shared/runner.ts";

const testInput = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`.trim();

const parse = (input: string) =>
	input.split("\n").map((row) =>
		Array.from(
			row,
			(char) => char === "@" ? true : false,
		)
	);

export const part1: Part = (input) => {
	const grid = parse(input);

	let total = 0;
	for (let y = 0; y < grid.length; y++) {
		const row = grid[y];
		for (let x = 0; x < row.length; x++) {
			const col = row[x];
			if (col !== true) continue; // No roll

			if (
				[
					grid[y - 1]?.[x - 1],
					grid[y - 1]?.[x],
					grid[y - 1]?.[x + 1],
					row[x - 1],
					row[x + 1],
					grid[y + 1]?.[x - 1],
					grid[y + 1]?.[x],
					grid[y + 1]?.[x + 1],
				].filter((v) => v === true).length < 4
			) total++;
		}
	}

	return total;
};

export const part2: Part = (input) => {
};
