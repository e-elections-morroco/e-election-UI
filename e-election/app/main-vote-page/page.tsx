"use client";
import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Image, Button, CardFooter } from "@nextui-org/react";
import HizbCard from "./hizbCard";
import { SearchIcon } from "./SearchIcon";
import { motion } from "framer-motion";
import Web3 from "web3";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import data from "./votes.json";
const contractAddress1 = "0x862F1e39D737b822877B42757AD26986D4C69e22"; // User
const contractABI1 = [
  [
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
  ],
];

const contractAddress2 = "0x15628DA52e0Ad01261Ab417FfC055E17E2606d3c"; // Remplacez ceci par l'adresse du contrat Electeur
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
        "name": "_UID",
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
  const [searchTerm, setSearchTerm] = useState("");

  const toStep2 = () => {
    if (step === 1) setStep(2);
    else setStep(1);
  };

  const handelClick = async (index: number) => {
    setIsVoted(index);
    if (confirm("Are you sure you want to vote for this party?")) {
      setFormData({
        ...formData,
        uid: index,
      });
      await connectMetamask();
      await connectContract();
      await vote();
      
    } else {
      setIsVoted(-1);
    }
  };

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

        await contract.methods.vote(formData.uid).send({ from: account });
        console.log("UID",formData.uid);
        toast.success("You voted successfully!");
        router.push("/");
      } else {
        toast.error("Please connect to MetaMask first");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while voting");
    }
  };

  const filteredHizbs = data.data.filter((hizb) =>
    hizb.NAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-center">
        <Input
          isClearable
          className="w-full sm:max-w-[44%] m-5"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center flex-wrap">
        {filteredHizbs.map((hizb, index) => (
          <motion.div
            key={hizb.uid}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
            onClick={() => handelClick(index)}
          >
            <div className="p-12" style={{ flex: '0 0 33.3333%' }}>
             
              <HizbCard
                hizb={{
                  uid: index,
                  logo: hizb.LOGO,
                  image: hizb.PHOTO,
                  name: hizb.NAME,
                  description: hizb.DESCRIPTION,
                  party: hizb.PARTY,
                  isVoted: isVoted === index,
                }}
              />
            </div>
            {(index + 1) % 3 === 0 && <div className="w-full" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
