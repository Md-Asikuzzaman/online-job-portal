import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();

    const createdUser = await prisma.user.create({
      data,
    });

    if (createdUser.role === 'student') {
      await prisma.studentProfile.create({
        data: {
          user_id: createdUser.user_id,
          gpa: 0,
          graduation_year: 0,
        },
      });
    }

    if (createdUser.role === 'company') {
      await prisma.companyProfile.create({
        data: {
          user_id: createdUser.user_id,
          company_name: '',
          industry: '',
          location: '',
        },
      });
    }

    return NextResponse.json({ msg: 'user created successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
export async function GET(req: Request, res: Response) {
  try {
    return NextResponse.json({ hi: 'asa' });
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
