"use client";
import React, { useId, useState } from "react";
import {Card, CardBody, CardHeader, Input , Image, DateInput, Button, CardFooter} from "@nextui-org/react";
import HizbCard from "./hizbCard"
 import { SearchIcon } from "./SearchIcon";
import { motion } from "framer-motion";
import Web3 from "web3";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const contractAddress2 = "0x8b092776f642BaFfC47Dcc6452CF4AF63548EF96"; // Remplacez ceci par l'adresse du contrat Electeur
const contractABI2 = [
{
"inputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"name": "electeurKeys",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
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
"name": "electeurs",
"outputs": [
{
"internalType": "uint256",
"name": "UID",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "voteCount",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getAllElecteurs",
"outputs": [
{
"components": [
{
  "internalType": "uint256",
  "name": "UID",
  "type": "uint256"
},
{
  "internalType": "uint256",
  "name": "voteCount",
  "type": "uint256"
}
],
"internalType": "struct Electeur.ElecteurInfo[]",
"name": "",
"type": "tuple[]"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "_UID",
"type": "uint256"
}
],
"name": "getElecteur",
"outputs": [
{
"internalType": "uint256",
"name": "",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "",
"type": "uint256"
}
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "_UID",
"type": "uint256"
}
],
"name": "setElecteur",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
{
"internalType": "uint256",
"name": "_UID1",
"type": "uint256"
},
{
"internalType": "uint256",
"name": "_UID2",
"type": "uint256"
}
],
"name": "vote",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
}
];


export default function App() {

    const [step, setStep] = useState(1);
    const [isVoted, setIsVoted] = useState(-1);
   const [formData, setFormData] = useState({
    uid: 0,
   });

    const toStep2 = () => {
        if( step === 1 ) setStep(2);
        else setStep(1);
    }
    

    const handelClick = async (index: number) => {
        setIsVoted(index);
        alert("are you sure you want to vote for this party ?")
        setFormData({
            ...formData,
            uid: index
        });
        await connectMetamask();
        await connectContract();
        await vote();
        toast.success("you voted successfully!");
        router.push("/");
    }
    

    const router = useRouter();
    let contract: any;
    let account: any;
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
              contractABI2,
              contractAddress2
            );
            console.log("Connected to contract at address: " + contractAddress2);
          } else {
            console.log("Please connect to MetaMask first");
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const vote = async () => {
        try {
            if (account && contract) {
                 
                await  contract.methods.vote(formData.uid, (0) ).send({ from: account });
                toast.success("Voter added successfully!");
            } else {
                toast.error("Veuillez d'abord vous connecter à MetaMask");
            }
        } catch (error) {
            console.error(error);
            toast.error("Une erreur s'est produite lors de la définition des informations utilisateur");
         }
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
      ()=>{handelClick(index)} 
    }
    >
    
    <React.Fragment >
        <div className="p-12" style={{ flex: '0 0 33.3333%' }}>
           {
            isVoted == index &&  <span className="text-danger text-bold flex-center text-center" style={
                {
                    fontSize: "3.5rem",
                    
                }
            }>
                X
            </span>
           }
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
