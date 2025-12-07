import type { Part } from "#shared/runner.ts";

const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`.trim();

const parse = (input: string) => input.split("\n").map((line) => Array.from(line, Number));

function getJoltage(banks: number[][], batteries: number) {
	let joltage = 0;

	for (const bank of banks) {
		let final = 0;
		let lastIdx = 0;

		for (let n = batteries; n >= 1; n--) {
			const value = Math.max(...bank.slice(lastIdx, n === 1 ? undefined : -n + 1));
			lastIdx = bank.indexOf(value, lastIdx) + 1;
			final = (final * 10) + value;
		}

		joltage += final;
	}

	return joltage;
}

export const part1: Part = (input) => getJoltage(parse(input), 2);
export const part2: Part = (input) => getJoltage(parse(input), 12);
