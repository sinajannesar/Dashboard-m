export const runtime = 'nodejs';
import { promises as fs } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import {Database} from "@/types/types"

const dbPath = path.join(process.cwd(), 'db.json');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function readDb(): Promise<Database> {
  const dbContents = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(dbContents) as Database;
}

export async function writeDb(db: Database): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

export async function initDb(): Promise<Database> {
  try {
    return await readDb();
  } catch {
    const emptyDb: Database = { users: [] };
    await writeDb(emptyDb);
    return emptyDb;
  }
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
}


