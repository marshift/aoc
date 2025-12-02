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

interface Rotation {
	direction: "L" | "R";
	distance: number;
}

const parse = (input: string) =>
	input.split("\n").map((line) => {
		const chars = line.split("");
		return {
			direction: chars.shift(),
			distance: Number(chars.join("")),
		} as Rotation;
	});

export const part1: Part = (input) => {
	const rotations = parse(input);
	let dial = 50;
	let hits = 0;

	for (const { direction, distance } of rotations) {
		if (direction === "L") {
			dial -= distance;
		} else {
			dial += distance;
		}

		if (dial % 100 === 0) hits++;
	}

	return hits;
};

export const part2: Part = (input) => {
};
