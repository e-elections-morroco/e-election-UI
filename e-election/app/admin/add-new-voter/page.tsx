"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Image, DateInput, Button, CardFooter, User, Avatar } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import Webcam from "react-webcam";
import { toast } from 'react-hot-toast';

export default function App() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [done, setDone] = React.useState(0);
  const constraints = {
    facingMode: { exact: "user" },
  };
   
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "15/10/2002",
    cin: "",
    city: "",
    picture: ""
  });
  const [timer , setTimer] = useState(5);

  const toStep2 = () => {
    setStep(2);
    
  };
      // i want to change it to set intervalle 

  const startTimer = () => {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          takePicture();
          setDone(1);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  }
  const takePicture = async () => {
    if (webcamRef.current) {
      const imageSrc = (webcamRef.current as any).getScreenshot(); // Type assertion
      setImgSrc(imageSrc);
      // You can perform further processing or send the image to the backend here
      // Display a message or handle the image as needed
      setStep(3);
      toast.success('Picture Saved Successfully');
    } else {
      // Handle the case when webcamRef.current is null
      console.error("Webcam reference is not available.");
    }
  };
 

  return (
    <Card className="p-10" style={
        {
            marginTop: "-70px",
        }
    }>
      <CardHeader className="pb-0 p-2 px-2 flex-col items-center text-danger">
        <h1 className="font-bold text-large">add the voter info</h1>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="text" label="First name" 
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <Input type="text" label="Last name" 
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="email" label="Email" 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input type="tel" label="Phone number" 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <DateInput
              label={"Birth date"}
              placeholderValue={new CalendarDate(1995, 11, 6)}
              className="max-w-sm"
              onChange={(value) => setFormData({ ...formData, birthDate: value.toString() })}
            />
              <Input type="text" label="CIN" 
              onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input type="text" label=" city" 
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className=" ">
            <Card radius= "none" shadow="none">
      <CardBody className="text-center text-danger text-bold">
    <span  style={
      {fontSize: "2rem" , 
      fontWeight: "bold" ,
      color: "red",
      marginTop: "-20px"
      }
    
    }>
    {timer}
    </span>
      </CardBody>
    </Card>
            <div className="text-danger">
               
            </div>
           <div>
           <Webcam videoConstraints={constraints} ref={webcamRef} />
            {imgSrc && <img src={imgSrc} alt="Captured" />}
           </div>
            </div>
          </div>
        )}
        {step === 3 && (
           <Card className="w-full md:w-96"> {/* Adjust the width as needed */}
           <CardBody className="p-8 flex flex-col items-center">
             <Avatar size="lg" src={imgSrc ? imgSrc : ""} className="w-20 h-20 text-large" />
         
             <div className="mt-4 text-center">
               <p>
                 Name: {formData.firstName} {formData.lastName}
               </p>
               <p>
                 Email: {formData.email}
               </p>
               <p>
                 Phone: {formData.phone}
               </p>
               <p>
                 Birth Date: {formData.birthDate}
               </p>
               <p>
                 CIN: {formData.cin}
               </p>
               <p>
                 City: {formData.city}
               </p>
             </div>
           </CardBody>
         </Card>
        )}
      </CardBody>
      <div className="flex flex-col items-center justify-center mt-5">
        {step === 1 &&
          <Button onClick={toStep2} color="danger" variant="bordered" >Next</Button> 
        }
          {step == 2  &&
          <Button onClick={startTimer} color="danger" variant="bordered"  >Take Picture</Button> 
          
          }
            {step == 3  &&
            <Button onClick={()=>alert("done")} color="danger" variant="bordered" >Save Voter</Button>
            }

      </div>
    </Card>
  );
}
