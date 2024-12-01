import { load as loadEnv } from "jsr:@std/dotenv";

const { SESSION_TOKEN } = await loadEnv();
const AOC_URL = "https://adventofcode.com";

export const getInput = (year: number, day: number) =>
	fetch(`${AOC_URL}/${year}/day/${day}/input`, {
		headers: {
			Cookie: `session=${SESSION_TOKEN}`,
		},
	}).then((r) => r.text()).then((t) => t.trim());
