import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

//Login
export async function POST(request) {
  
  try {
    const {  email, password } = await request.json();
    if ( !email || !password)
      return NextResponse.json({ status: false, message: "empty Filds" });

    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ status: false, message: "Invalid email" });
    }

    let userExist = await prisma.user.findFirst({ where: { email } });
    if (!userExist)
      return NextResponse.json({ status: false, message: "Register first" },{status:400});

    if(userExist.password!=password)return NextResponse.json({ status: false, message: "Worng Password" },{status:400});
    var token = jwt.sign({id: userExist._id },process.env.JWT);
    return NextResponse.json(
      { status: true, message: "Login", userExist,token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
