import { promises as fs } from 'fs';

export async function getSession(): Promise<string> {
  return await fs.readFile('session_id', 'utf-8');
}


export async function getInput(day: number): Promise<string> {
  const session = `session=${await getSession()}`;
  const response = await fetch(`https://adventofcode.com/2025/day/${day}/input`, {
    headers: {
      'Cookie': session,
    },
  });
  return await response.text();
}
