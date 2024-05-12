"use client";
import React, { useState } from "react";
import {Card, CardBody, CardHeader, Input , Image, DateInput, Button, CardFooter} from "@nextui-org/react";
import {CalendarDate} from "@internationalized/date";
 

export default function App() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        cin: "",
        address: "",
        picture: ""
    });

    const toStep2 = () => {
        if( step === 1 ) setStep(2);
        else setStep(1);
    }

  return (
    <Card className="p-10">
    <CardHeader className="pb-0 p-2 px-2 flex-col items-center">
      
      <h1 className="font-bold text-large">Information Requeste</h1>
    </CardHeader>
    <CardBody className="overflow-visible py-2">

    {step === 1 && (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="text" label="First name" />
      <Input type="text" label="Last name" />
      
      
    </div>
    

      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="email" label="Email" />
      <Input type="tel" label="phone number" />
      
      
    </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DateInput label={"Birth date"} placeholderValue={new CalendarDate(1995, 11, 6)} className="max-w-sm" />
      <Input type="text" label="CIN" />
     </div>
     <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
     <Input type="text" label="your adress" />
     </div>
    </div> )}

    {step === 2 && (
    <div>
        CAMERA
    </div>)}
    
    </CardBody>
     
   <div className="flex flex-col items-center justify-center mt-5  ">
   <Button 
    onClick={toStep2}
   >
        submit
    </Button>
   </div>
     
  </Card>
     
  );
}
