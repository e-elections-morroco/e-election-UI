"use client";
import React, { useState } from "react";
import {Card, CardBody, CardHeader, Input , Image, DateInput, Button, CardFooter} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";
import toast from "react-hot-toast"; 
import { useRouter } from "next/navigation";

import NextLink from "next/link";



export default function App() {

 
  const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        codeEmploye: "",
        password: "",
    });

    

     const user = {

        codeEmploye: "123456",
        password  : "123456"
    }

    const login = () => {
        if(formData.codeEmploye === user.codeEmploye && formData.password === user.password){
            toast.success("login success");
            router.push("/admin/choice-page");
        }else{
            toast.error("wrong cridentials");
        }
    }

  return (


    <div  className=" ">

      <div style={
        {
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          marginTop: "-80px",
        }
      }>
      <NextLink href="/">
			<img
				width={80}
				alt="Roayaume du Maroc"
				src="imgs/Coat_of_arms_of_Morocco.svg.png"
			/>
			</NextLink>
      </div>
        <Card className="p-10">
    <CardHeader className="pb-0 p-2 px-2 flex-col items-center">
      
      <h1 className="font-bold text-large text-danger text-bold ">Login</h1>
    </CardHeader>
    <CardBody className="overflow-visible py-2">

     
    <div className="flex flex-col gap-4 text-danger">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="text" label="Code employe" 
      onChange={(e) => setFormData({ ...formData, codeEmploye: e.target.value })}
      />
      
      
    </div>
    

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="password" label="password" 
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
       
      
      
    </div>
     
    
    </div>  

     
    
    </CardBody>
     
   <div className="flex flex-col items-center justify-center mt-5  ">
   <Button 
    color="danger" variant="bordered" onClick={login}
   >
        login
    </Button>
   </div>
     
  </Card>
    </div>
  
     
  );
}
