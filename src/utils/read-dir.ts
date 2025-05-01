import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export const deepReadDir = async (dirPath: string): Promise<string[]> =>
  Promise.all(
    readdirSync(dirPath, { withFileTypes: true }).map(async dirent => {
      const path = join(dirPath, dirent.name)
      return dirent.isDirectory() ? await deepReadDir(path) : path
    }),
  ) as Promise<string[]>
