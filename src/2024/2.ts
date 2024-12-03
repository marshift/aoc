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

function simulate(reports: number[][], useProblemDampener: boolean) {
	let safeCount = 0;

	for (const report of reports) {
		let isSafe = true;
		let isDampenerUsed = false;
		let targetDirection;

		for (let idx = 0; idx < report.length - 1; idx++) {
			const currLevel = report[idx];
			const nextLevel = report[idx + 1];

			const distance = nextLevel - currLevel;
			const absDistance = Math.abs(distance);
			const direction = distance > 0; // True if increasing, false if decreasing or same
			if (idx === 0) targetDirection = direction; // Every following index should match this

			if (
				(absDistance < 1 || absDistance > 3)
				|| (direction !== targetDirection)
			) {
				if (useProblemDampener && !isDampenerUsed) {
					isDampenerUsed = true;
					report.splice(idx, 1);
					idx = -1;
					continue;
				} else {
					isSafe = false;
					break;
				}
			}
		}

		if (isSafe) safeCount++;
	}

	return safeCount;
}

export const part1: Part = (input) => {
	const reports = parse(input);
	return simulate(reports, false);
};

// TODO: There is an issue with the logic for p2 that I have not yet worked out
// Namely, the result is too low. I think it may be to do with duplicate adjacent numbers.
// Of course, it works on the example data...
export const part2: Part = (input) => {
	const reports = parse(input);
	return simulate(reports, true);
};
