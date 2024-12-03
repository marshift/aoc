import type { Part } from "#shared/runner.ts";

const testInputs = [
	"xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
	"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
];

export const part1: Part = (input) => {
	const matches = input.matchAll(/mul\((\d*,\d*)\)/g);
	let total = 0;

	matches.forEach((m) => total += eval(m[1].replace(",", "*")));
	return total;
};

export const part2: Part = (input) => {
	const matches = input.matchAll(/mul\((\d*,\d*)\)|(do|don't)\(\)/g);
	let total = 0;
	let isMulEnabled = true;

	for (const match of matches) {
		if (match[2]) { // Matched a state instruction
			isMulEnabled = match[2] === "do";
		} else if (isMulEnabled) {
			total += eval(match[1].replace(",", "*"));
		}
	}

	return total;
};
