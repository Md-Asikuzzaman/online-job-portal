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
    const job = await prisma.jobListing.findFirst({
      where: {
        job_id: Number(id),
      },
    });

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: ParamsType) {
  try {
    const data = await req.json();
    const { id } = context.params;
    const job = await prisma.jobListing.update({
      where: {
        job_id: Number(id),
      },
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        salary: Number(data.salary),
      },
    });

    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: ParamsType) {
  try {
    const { id } = context.params;

    await prisma.application.deleteMany({
      where: {
        job_id: Number(id),
      },
    });

    await prisma.jobListing.delete({ where: { job_id: Number(id) } });
    
    return NextResponse.json(
      { message: 'Job deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
