import type { Part } from "#shared/runner.ts";

const testInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`.trim();

function parse(input: string) {
	const lines = input.split("\n");
	const sepIdx = lines.findIndex((l) => l.length === 0);

	return {
		rules: lines.slice(0, sepIdx - 1).map((l) => l.split("|").map(Number)),
		sequences: lines.slice(sepIdx + 1).map((l) => l.split(",").map(Number)),
	};
}

export const part1: Part = (input) => {
	const { rules, sequences } = parse(testInput);

	for (const seq of sequences) {
		const relevantRules = rules.filter((r) => r.some((n) => seq.includes(n)));
		for (const rule of relevantRules) {
			const [before, after] = rule;
		}
	}
};

export const part2: Part = (input) => {
};
