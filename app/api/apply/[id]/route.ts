import prisma from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface ParamsType {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, context: ParamsType) {
  try {
    const { id } = context.params;

    await prisma.application.delete({
      where: {
        job_id: Number(id),
      },
    });

    return NextResponse.json(
      { message: 'Withdraw successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
