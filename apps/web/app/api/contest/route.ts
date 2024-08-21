import prisma from "@repo/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const resp = await prisma.contest.findMany({
            take:4
        });
        return NextResponse.json({resp},{status:200})
    } catch (error) {
        return NextResponse.json({message:error},{status:504});
    }
}

// {
//     "name": "A1",
//     "problemsId": [
//       "add",
//       "binarysearch"
//     ],
//     "score": [
//       "100",
//       "350"
//     ],
//     "startTime": "2024-07-18T08:30:00.000Z"
//   }