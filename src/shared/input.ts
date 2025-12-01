import { load as loadEnv } from "@std/dotenv";

const { SESSION_TOKEN } = await loadEnv();
const AOC_BASE_URL = "https://adventofcode.com";

export const getInput = (year: number, day: number) =>
	fetch(`${AOC_BASE_URL}/${year}/day/${day}/input`, {
		headers: {
			Cookie: `session=${SESSION_TOKEN}`,
		},
	}).then((r) => r.text()).then((t) => t.trim());
