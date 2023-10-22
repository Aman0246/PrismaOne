import { prisma } from "@/prisma";
import { NextResponse } from "next/server";




//get all users
export async function GET(){
  try {
      const user = await prisma.User.findMany()
      return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({message:'Error',error},{status:500})
    
  }
}