
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse} from "next/server";
const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const { slug, language } = await req.json();
    console.log("SLUG LANGUAGE",slug,language);
    let languagebp;
    switch (language) {
        case "cpp":
            languagebp = "boilerplateCppHalf";
            break;
        case "js":
            languagebp = "boilerplateJavascriptHalf";
            break;
        case "java":
            languagebp = "boilerplateJavaHalf";
            break;
        case "py":
            languagebp = "boilerplatePythonHalf";
            break;
        default:
            return NextResponse.json({ error: 'Invalid language' }, { status: 400 });
        }
        let lanaguagebpf = languagebp.replace("Half","Full");
        const selectFields = {
            [languagebp]: true,
            [lanaguagebpf]: true
        };
    try {
    const resp = await prisma.problems.findUnique({
        where:{
            slug:slug
        },
        select: selectFields
    })
    const responseObject = {
        boilerplateHalf: resp![languagebp],
        boilerplateFull: resp![lanaguagebpf],
    };

    return NextResponse.json({message:responseObject},{status:200})
} catch (error) {
    return NextResponse.json({error:error},{status:404})
}
}