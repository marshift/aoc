import { getInput } from "#shared/input.ts";

export type Part = (input: string) => string | number | void;

const [year, day, partNum] = Deno.args.map(Number);

const input = await getInput(year, day);
const dayExports = await import(`../${year}/${day}.ts`) as Record<string, Part>;

console.log(dayExports[`part${partNum}`](input));
