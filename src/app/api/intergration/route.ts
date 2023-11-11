export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const random = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  export async function GET(req: NextRequest) {
    try {
      const problems = await prisma.integration.findMany({});

      if(problems.length === 0) {
        return Response.json({error: "No record"}, {status: 404})
      }
      return Response.json([problems[random(problems.length)]])
    }
    catch (e) {
      if (e instanceof Error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 });
      }
    }
  }

  
