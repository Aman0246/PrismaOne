import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { tweet, userId } = await request.json();
    if (!tweet && !userId) {
      return NextResponse.json({ status: false, message: "Invalid" });
    }
    const user = await prisma.User.findFirst({where:{id:userId}})
    if(!user) return NextResponse.json({ status: false, message: "invalid user" },{status:401});    
    let data = await prisma.Tweets.create({
      data: { tweet, userId },
    });
    return NextResponse.json({ status: true, message: "Tweets created", data:data });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
