import { promises as fs } from 'fs';

const dirPath = "./inputs"

async function getSession(): Promise<string> {
  return await fs.readFile('session_id', 'utf-8');
}

async function makeInputDir() {
  const dir = await fs.readdir(dirPath)
  if(!dir) {
    return await fs.mkdir(dirPath);
  }
}

async function cache(day: number, input: string) {
  await makeInputDir();
  await fs.writeFile(`${dirPath}/${day}`, input);
  return input;
}

async function getCached(day: number) {
  try {
    return await fs.readFile(`${dirPath}/${day}`, 'utf-8');  
  } catch {
    return null;
  }
}

async function getNew(day: number) {
  const session = `session=${await getSession()}`;
  const response = await fetch(`https://adventofcode.com/2025/day/${day}/input`, {
    headers: {
      'Cookie': session,
    },
  });
  return await response.text();
}

export async function getInput(day: number): Promise<string> {
  return await getCached(day) ?? await cache(day, await getNew(day));
}
