import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect('/signin'); // Replace with your actual sign-in route
    
    }
    let profile =await db.profile.findUnique({
        where:{
            userId:user.id
        }
    });
    if (!profile) {
        profile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });
    }

    return profile;
};