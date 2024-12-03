import type { Part } from "#shared/runner.ts";

const testInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();

const parse = (input: string) => input.split("\n").map((i) => i.split(" ").map(Number));

function isReportSafe(report: number[]) {
	let isIncreasing = true;
	let isDecreasing = true;

	for (let idx = 1; idx < report.length; idx++) {
		const distance = report[idx] - report[idx - 1];
		if (distance < 0) isIncreasing = false;
		if (distance > 0) isDecreasing = false;

		if (
			(Math.abs(distance) > 3 || distance === 0)
			|| !(isIncreasing || isDecreasing)
		) return false;
	}

	return true;
}

export const part1: Part = (input) => {
	const reports = parse(input);
	return reports.filter(isReportSafe).length;
};

export const part2: Part = (input) => {
	const reports = parse(input);
	return reports.filter((report) => {
		if (isReportSafe(report)) return true;

		for (let idx = 0; idx < report.length; idx++) {
			if (isReportSafe(report.toSpliced(idx, 1))) return true;
		}
	}).length;
};
