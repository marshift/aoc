import type { Part } from "#shared/runner.ts";

const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();

const parse = (input: string) => input.split("\n").map((line) => Array.from(line, Number));

export const part1: Part = (input) => {
	const banks = parse(input);

	let joltage = 0;
	for (const bank of banks) {
		const tens = Math.max(...bank.slice(0, -1));
		const ones = Math.max(...bank.slice(bank.indexOf(tens) + 1));

		joltage += tens * 10 + ones;
	}

	return joltage;
};

export const part2: Part = (input) => {
};
