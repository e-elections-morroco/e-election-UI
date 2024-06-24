"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Image, DateInput, Button, CardFooter, User, Avatar } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import Webcam from "react-webcam";
import { toast } from 'react-hot-toast';
import Web3 from "web3";
import { useRouter } from "next/navigation";
const contractAddress = "0xfa0d7dA8D1024D4b411C0f55B635c171F7ab9DD5"; // Remplacez ceci par l'adresse du contrat User
const contractABI = [
{
"inputs": [
{
"internalType": "address",
"name": "_userAddress",
"type": "address"
}
],
"name": "getUserByAddress",
"outputs": [
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "bool",
"name": "isVoted",
"type": "bool"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "string",
"name": "_cin",
"type": "string"
},
{
"internalType": "string",
"name": "_dateOfBirth",
"type": "string"
}
],
"name": "getUserByCinAndDateOfBirth",
"outputs": [
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "string",
"name": "",
"type": "string"
},
{
"internalType": "bool",
"name": "isVoted",
"type": "bool"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "_userAddress",
"type": "address"
},
{
"internalType": "string",
"name": "_firstName",
"type": "string"
},
{
"internalType": "string",
"name": "_lastName",
"type": "string"
},
{
"internalType": "string",
"name": "_birthDate",
"type": "string"
},
{
"internalType": "string",
"name": "_cin",
"type": "string"
},
{
"internalType": "string",
"name": "_email",
"type": "string"
},
{
"internalType": "string",
"name": "_ville",
"type": "string"
},
{
"internalType": "string",
"name": "_phone",
"type": "string"
}
],
"name": "setUser",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"name": "userAddresses",
"outputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "",
"type": "address"
}
],
"name": "users",
"outputs": [
{
"internalType": "string",
"name": "firstName",
"type": "string"
},
{
"internalType": "string",
"name": "lastName",
"type": "string"
},
{
"internalType": "string",
"name": "birthDate",
"type": "string"
},
{
"internalType": "string",
"name": "CIN",
"type": "string"
},
{
"internalType": "string",
"name": "email",
"type": "string"
},
{
"internalType": "string",
"name": "ville",
"type": "string"
},
{
"internalType": "string",
"name": "phone",
"type": "string"
},
{
"internalType": "bool",
"name": "isVoted",
"type": "bool"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "address",
"name": "_userAddress",
"type": "address"
}
],
"name": "vote",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
}
];
// import the axios to handle a backend request 
import axios from "axios";

export default function App() {

  const router = useRouter();
  let contract: any;
  let account: any;




  function base64ToBlob(base64: any, contentType: any) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
  
  // Convert Base64 string to a File
  function base64ToFile(base64: any, filename: any) {
    const contentType = base64.split(',')[0].split(':')[1].split(';')[0];
    const blob = base64ToBlob(base64, contentType);
    return new File([blob], filename, { type: contentType });
  }
  
  const connectMetamask = async () => {
    try {
      if ((window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        account = accounts[0];
        console.log(account);
      } else {
        console.log("Please install Metamask or use a web3 browser");
      }
    } catch (error) {
      console.error(error);
      console.log("An error occurred while connecting Metamask");
    }
  };
  // // Define a function to connect the contract
  const connectContract = async () => {
    try {
      if (account) {
        (window as any).web3 = new Web3((window as any).ethereum);
        contract = new (window as any).web3.eth.Contract(
          contractABI,
          contractAddress
        );
        console.log("Connected to contract at address: " + contractAddress);
      } else {
        console.log("Please connect to MetaMask first");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setUserInfo = async () => {
    try {
        if (account) {
             
            await  contract.methods.setUser(account, formData.firstName, formData.lastName, formData.birthDate, formData.cin, formData.email, formData.city, formData.phone).send({ from: account });
            toast.success("Voter added successfully!");
        } else {
            toast.error("Veuillez d'abord vous connecter à MetaMask");
        }
    } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de la définition des informations utilisateur");
     }
}


const handleRegister = async () => {
    try {
        await connectMetamask();
        await connectContract();
        await setUserInfo();
        toast.success("Voter added successfully!");

    } catch (error) {
        console.error(error);
        toast.error("Une erreur s'est produite lors de l'inscription");
    }

}






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
      const imageFile = base64ToFile(imageSrc, 'uploaded_image.png');

        // make a request to 

      setImgSrc(imageSrc);
        console.log('imageFile :');
        console.log(imageFile);

      // You can perform further processing or send the image to the backend here
      // Display a message or handle the image as needed

      const formData = new FormData();
      // Append the image file to the form data
      formData.append('image', imageFile);
          console.log('formData :');
          console.log(formData);
      // 1 check if the image is valide or not BY calling the api  /api/image/is-valid

      const response = await axios.post('http://localhost:5000/api/image/is-valid', formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }});


      console.log(response.data);


    
      // 2 send the image to the backend







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
            <Button onClick={handleRegister} color="danger" variant="bordered" >Save Voter</Button>
            }

      </div>
    </Card>
  );
}

