import type { Part } from "#shared/runner.ts";

const testInput = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`.trim();

function parse(input: string) {
	const lines = input.split("\n");
	const sepIdx = lines.findIndex((l) => l.length === 0);

	return {
		ranges: lines.slice(0, sepIdx).map((range) => range.split("-").map(Number)),
		ids: lines.slice(sepIdx + 1).map(Number),
	};
}

export const part1: Part = (input) => {
	const { ranges, ids } = parse(input);

	let fresh = 0;
	for (const id of ids) if (ranges.some(([start, end]) => id >= start && id <= end)) fresh++;

	return fresh;
};

export const part2: Part = (input) => {
};
