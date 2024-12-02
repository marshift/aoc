import type { Part } from "#shared/runner.ts";

const testInput = `
3   4
4   3
2   5
1   3
3   9
3   3
`.trim();

// Generic between p1 and p2
function getLists(input: string) {
	// Make arrays for each location list
	const listA = new Array<number>();
	const listB = new Array<number>();

	// Split the input into the two lists
	const lines = input.split("\n");
	for (const line of lines) {
		const [locA, locB] = line.split("   ").map(Number);
		listA.push(locA);
		listB.push(locB);
	}

	return [listA, listB];
}

export const part1: Part = (input) => {
	const lists = getLists(input);

	// Sort both
	lists.forEach((l) => l.sort((a, b) => a - b));

	// Pair up the values by size
	const pairs = lists[0].map((val, idx) => [val, lists[1][idx]]);

	// Get distances between each pair
	const distances = pairs.flatMap((pair) => Math.abs(pair[0] - pair[1]));

	// Get total distance, done!
	return distances.reduce((prev, curr) => prev + curr);
};

export const part2: Part = (input) => {
	const lists = getLists(input);
	let score = 0;

	// Loop over everything in left list
	for (const num of lists[0]) {
		// Get number of times it appears in the right list
		const appearances = lists[1].filter((i) => i === num).length;

		// Add to total
		score += num * appearances;
	}

	return score;
};
