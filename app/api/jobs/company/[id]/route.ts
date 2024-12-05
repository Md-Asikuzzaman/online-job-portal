import prisma from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsType {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, context: ParamsType) {
  try {
    const { id } = context.params;

    const findUser = await prisma.user.findFirst({
      where: {
        user_id: Number(id),
      },
      include: {
        companyProfile: {
          include: {
            JobListing: true,
          },
        },
      },
    });

    const jobs = findUser?.companyProfile?.JobListing;

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
