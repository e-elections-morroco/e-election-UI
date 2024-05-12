"use client";
import React, { useState } from "react";
import {Card, CardBody, CardHeader, Input , Image, DateInput, Button, CardFooter} from "@nextui-org/react";
import HizbCard from "./hizbCard"
 import { SearchIcon } from "./searchIcon";
import { motion } from "framer-motion";

export default function App() {

    const [step, setStep] = useState(1);
   

    const toStep2 = () => {
        if( step === 1 ) setStep(2);
        else setStep(1);
    }

  return (
     

    // 
     <div>
        

<div className="flex items-center justify-center "> 
    
<Input
            isClearable
            className="w-full sm:max-w-[44%] m-5 "
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            
            
          />
</div>
       <div className="flex items-center flex-wrap">

      





  {[...Array(20)].map((_, index) => (

    <motion.div
    key={index}
    whileHover={{
    scale: [1, 1.1, 1, 1.1, 1],
    rotate: [0, -5, 5, -5, 5, 0],
    }}
    transition={{ duration: 0.3 }}

    onClick={
        () => {
            console.log(`Hizb ${index + 1}`);
        }
    }
    >
    
    <React.Fragment >
        <div className="p-12" style={{ flex: '0 0 33.3333%' }}>
            <HizbCard
            hizb={{
                uid: index,
                image: "https://www.nextui.org/assets/images/logo/logo.svg",
                name: `Hizb ${index + 1}`,
                description: `Hizb ${index + 1} description`,
            }}
            />
        </div>
        {(index + 1) % 3 === 0 && <div className="w-full" />}
        </React.Fragment>

    </motion.div>

   
  ))}
</div>
      
     </div>


    
     
     
  );
}
