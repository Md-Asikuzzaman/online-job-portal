import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  try {
    const jobs = await prisma.jobListing.findMany({
      include: {
        applications: {
          include: {
            student: true,
          },
        },
      },
    });

    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const currentUser = await getCurrentUser();
    const getCompany = await prisma.companyProfile.findFirst({
      where: {
        user_id: currentUser?.user_id,
      },
    });

    if (getCompany) {
      await prisma.jobListing.create({
        data: {
          company_id: getCompany.company_id,
          title: data.title,
          description: data.description,
          location: data.location,
          salary: Number(data.salary),
        },
      });
      return NextResponse.json({ msg: 'user created successfully' });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'something went wrong' },
      { status: 500 }
    );
  }
}
