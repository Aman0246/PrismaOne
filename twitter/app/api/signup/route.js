import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

//register
export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password)
      return NextResponse.json({ status: false, message: "empty Filds" });
    let userExist = await prisma.user.findFirst({ where: { email } });
    if (userExist)
      return NextResponse.json({ status: false, message: "used email" });
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ status: false, message: "Invalid email" });
    }

    const user = await prisma.User.create({
      data: {
        name,
        email,
        password,
      },
    });

    
    return NextResponse.json(
      { status: true, message: "userCreated", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
