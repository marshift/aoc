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

function merge(ranges: number[][]) {
	const sorted = ranges.toSorted((a, b) => a[0] - b[0]);
	const merged = [];

	let current = sorted.shift()!;
	for (const next of sorted) {
		if (current[1] < next[0]) {
			merged.push(current);
			current = next;
		} else {
			current[1] = Math.max(current[1], next[1]);
		}
	}
	merged.push(current);

	return merged;
}

function parse(input: string) {
	const lines = input.split("\n");
	const sepIdx = lines.findIndex((l) => l.length === 0);

	return {
		ranges: merge(lines.slice(0, sepIdx).map((range) => range.split("-").map(Number))),
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
	const { ranges } = parse(input);

	let fresh = 0;
	for (const [start, end] of ranges) fresh += (end - start) + 1;

	return fresh;
};
