"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Image, DateInput, Button, CardFooter, User, Avatar } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import Webcam from "react-webcam";
import { toast } from 'react-hot-toast';

export default function App() {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const constraints = {
    facingMode: { exact: "user" },
  };
  const [isVoted , setIsVoted] = useState(false);
   const [isEligible , setIsEligible] = useState(false);
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
    <Card className="p-10" style={{ marginTop: step === 2 ? "-70px" : "" }}>
    <CardHeader className="pb-0 p-2 px-2 flex-col items-center">
      {step === 1 && (
      <h1 className="font-bold text-large text-danger text-bold " >ادخل معلوماتك</h1>
      )
      }
    {step === 2 && (
      <h1 className="font-bold text-large text-danger text-bold " >التقاط صورة</h1>
      )}
      
    </CardHeader>
    <CardBody className="overflow-visible py-2">

     {
        step === 1 && (
          <div className="flex flex-col gap-4 text-danger">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input type="text" label="رقم البطاقة الوطنية" />
          
          
        </div>
        
    
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <DateInput
                  label={"تاريخ الميلاد"}
                  placeholderValue={new CalendarDate(1995, 11, 6)}
                  className="max-w-sm"
                  onChange={(value) => setFormData({ ...formData, birthDate: value.toString() })}
                />
           
          
          
        </div>
         
        
        </div> )
     }
     
      {
        step === 2 && (
          <div>
             <Card radius= "none" shadow="none">
      <CardBody className="text-center text-danger text-bold">
    <span style={
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
            <div className="flex flex-col gap-4 text-danger">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={constraints}
          />
          
          
        </div>
        
    
          </div>
          <div className="flex flex-col items-center justify-center mt-5  ">
          <Button
                  color="danger"
                  onClick={startTimer}
                  variant="bordered"
                  className="max-w-sm"
                >
                  التقاط صورة
                </Button>
           
          
          
        </div>
         
        
        </div>
          </div>
           )
      }
     
    
    </CardBody>
      {
        step == 1 && (
          <div className="flex flex-col items-center justify-center mt-5  ">
   <Button 
    color="danger" variant="bordered"
    onClick={toStep2}
   >
        ولوج
    </Button>
   </div>
        )
      }
        
        {
          step === 3 && (
            <div className="flex flex-col items-center justify-center mt-5  ">

                {
                  isVoted && (
                    <div>
                      <p>
                      لقد قمت بالتصويت مسبقا 
                    </p>
                     <Button 
                     color="danger" variant="bordered"
                     onClick={()=> {alert("out")}}
                    >
                         خروج 
                    </Button>
                    </div>
                  )
                }

                {
                  !isEligible && (
                    <div>
                      <p>
                        لا يمكنك التصويت لانك لا تتوفر فيك الشروط اللازمة 
                     </p>
                      <Button 
                      color="danger" variant="bordered"
                      onClick={()=> {alert("out")}}
                     >
                          خروج 
                     </Button>
                    </div>
                  )
                }

                {
                  !isVoted && isEligible && (
                     <div>
                      <p>
                      يمكنك التصويت الان
                     </p>
                      <Button 
                      color="danger" variant="bordered"
                      onClick={startTimer}
                     >
                          التالي
                     </Button>
                     </div>
                  )
                }


           
            </div>
          )
        }
  </Card>
  );
}
