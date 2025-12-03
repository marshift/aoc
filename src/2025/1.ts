import type { Part } from "#shared/runner.ts";

const testInput = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim();

const parse = (input: string) =>
	input.split("\n").map((line) => {
		const direction = line[0] as "L" | "R";
		const amount = Number(line.slice(1));
		return direction === "L" ? -amount : amount;
	});

const DIAL_START = 50;

export const part1: Part = (input) => {
	const rotations = parse(input);
	let dial = DIAL_START;

	let hits = 0;
	for (const rot of rotations) if ((dial += rot) % 100 === 0) hits++;

	return hits;
};

export const part2: Part = (input) => {
	const rotations = parse(input);
	let dial = DIAL_START;

	let hits = 0;
	for (const rot of rotations) {
		let start, end;

		const oldPos = dial;
		const newPos = dial += rot;

		if (rot < 0) {
			start = Math.ceil(newPos / 100);
			end = Math.floor((oldPos - 1) / 100);
		} else {
			start = Math.ceil((oldPos + 1) / 100);
			end = Math.floor(newPos / 100);
		}

		if (start <= end) hits += 1 + end - start;
	}

	return hits;
};
