"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Image, DateInput, Button, CardFooter, User, Avatar } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import Webcam from "react-webcam";
import Web3 from "web3";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
 



export default function App() {



 
  const [loding , setLoding] = useState(false);

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const constraints = {
    facingMode: { exact: "user" },
  };
  const [isVoted , setIsVoted] = useState(false);
   const [isEligible , setIsEligible] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
  
    cin: "",
    birthDate: "",
  });
  const [timer , setTimer] = useState(5);

  
      // i want to change it to set intervalle 

   const router = useRouter();

   const toRoute = () => {
        router.push("/")
    }
   
 

 
  return (
    <Card className="p-10" style={{ marginTop: step === 2 ? "-70px" : "" }}>
     
      
            <div className="flex flex-col items-center justify-center mt-5  ">
 

              
                     <div>
                      <p className="p-10">
                    لقد تم التصويت بنجاح
                     </p>
                      <Button 
                      color="danger" variant="bordered"
                      onClick={ toRoute
                      }
                     >
                          الرئيسي
                     </Button>
                     </div>
                  

            </div>
         
  </Card>
  );
}
