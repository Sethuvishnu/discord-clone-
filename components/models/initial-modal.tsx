"use client";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form";
import axios from "axios";

import{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, 
    FormMessage

} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useEffect, useState } from "react";
import FileUpload from "../file-upload";
import { useRouter } from "next/navigation";

const formSchema=z.object({
    name:z.string().min(1,{
        message:"Server name is required."
    }),
    imageUrl: z.string().min(1,{
        message:"Server image is required."
    })
});
export const InitialModal=()=>{
    const [isMounted,setisMounted]=useState(false)
    const router = useRouter();
    useEffect(()=>{
        setisMounted(true)
    },[]);
    const form=useForm({
        resolver:zodResolver(formSchema),
        defaultValues: {
            name:"",
            imageUrl:"",
        }
    });

    const isloading=form.formState.isSubmitting;

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
        try{
            await axios.post("/api/servers",values);
            form.reset();
            router.refresh();
            window.location.reload();

        }catch(error){
            console.log(error);
        }
    }

    if (!isMounted){
        return null;
    }
    return(
       <Dialog open>
        <DialogContent className="bg-white text-black p=0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-2x1 text-center">
                    holla
                </DialogTitle>
                <DialogDescription className="test-centre text-zinc-500">
                    give an image and a a Name
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                    <div className="space-y-8 px-6">
                        <div className="flex items-center justify-center text-center">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                            endpoint="serverImage"
                                            value={field.value}
                                            onChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                        </div>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                    Server name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isloading}
                                        className="bg-zinc-300/50 border-0 
                                        focus-visible:ring-0 text-black 
                                        focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                        {...field}
                                   
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                    </div>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <Button variant={"primary"} disabled={isloading}>
                            Create
                        </Button>
                    </DialogFooter>
                </form>

            </Form>
        </DialogContent>
        </Dialog>
    )
}