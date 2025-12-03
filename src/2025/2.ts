import type { Part } from "#shared/runner.ts";

const testInput = `
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124
`.trim();

const parse = (input: string) =>
	input.split(",").flatMap((range) => {
		const [start, end] = range.split("-").map(Number);
		return Array.from(
			{ length: Math.ceil(end - start) + 1 },
			(_, i) => String(start + i),
		);
	});

export const part1: Part = (input) => {
	const ids = parse(input);

	let total = 0;
	for (const id of ids) if (id.match(/^(\d+)\1$/)) total += Number(id);

	return total;
};

export const part2: Part = (input) => {
	const ids = parse(input);

	let total = 0;
	for (const id of ids) if (id.match(/^(\d+)\1+$/)) total += Number(id);

	return total;
};
