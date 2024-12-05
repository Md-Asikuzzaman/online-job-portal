import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const currentUser = await getCurrentUser();
    const findStudent = await prisma.user.findFirst({
      where: {
        user_id: currentUser?.user_id,
      },
      include: {
        studentProfile: true,
      },
    });

    const studentId = findStudent?.studentProfile?.student_id;

    if (data && studentId) {
      await prisma.application.create({
        data: {
          student_id: studentId,
          job_id: Number(data.job_id),
        },
      });
    }

    return NextResponse.json(
      { message: 'Applied Successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
