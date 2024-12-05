interface ParamsType {
  params: {
    id: string;
  };
}

import prisma from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: ParamsType) {
  try {
    const { id } = context.params;
    const applicants = await prisma.application.findMany({
      where: {
        job_id: Number(id),
      },

      include: {
        job: true,
        student: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json({ applicants }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
