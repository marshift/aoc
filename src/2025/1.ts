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
		const chars = line.split("");
		return {
			direction: chars.shift(),
			distance: Number(chars.join("")),
		} as Rotation;
	});

interface Rotation {
	direction: "L" | "R";
	distance: number;
}

class Dial {
	#position = 50;
	get position() {
		return this.#position;
	}

	rotate(rot: Rotation) {
		if (rot.direction === "L") this.#position -= rot.distance;
		else this.#position += rot.distance;
		return this.#position;
	}
}

export const part1: Part = (input) => {
	const rotations = parse(input);
	const dial = new Dial();

	let hits = 0;
	for (const rot of rotations) if (dial.rotate(rot) % 100 === 0) hits++;

	return hits;
};

export const part2: Part = (input) => {
	const rotations = parse(input);
	const dial = new Dial();

	let hits = 0;
	for (const rot of rotations) {
		let start, end;

		const oldPos = dial.position;
		const newPos = dial.rotate(rot);

		if (rot.direction === "L") {
			start = Math.ceil(newPos / 100);
			end = Math.floor((oldPos - 1) / 100);
		} else {
			start = Math.ceil((oldPos + 1) / 100);
			end = Math.floor(newPos / 100);
		}

		// I sure do love special cases not included in the example.
		if (start <= end) hits += 1 + end - start;
	}

	return hits;
};
