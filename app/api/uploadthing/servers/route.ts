import { currentProfile } from "@/lib/current-profile";
import {v4 as uuidv4} from "uuid";
import { db} from "@/lib/db";
import { profile } from "console";
import { NextResponse } from "next/server";

 export async function POST(req:Request) {
    try{
        if (!profile){
            return new NextResponse("Unauthorized",{status:401});

        }

    }
    catch(error){
        console.log("[SERVERS_POST]",error);
        return new NextResponse("Internal Error",{status:500});
    }
    
 }