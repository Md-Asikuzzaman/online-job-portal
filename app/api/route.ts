import { NextResponse } from 'next/server';
import prisma from '../lib/db';

export async function GET(req: Request, res: Response) {
  const users = await prisma.jobListing.findMany({});

  return NextResponse.json(users);
}
