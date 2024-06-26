"use client"
import React, { useEffect, useState } from "react";
import votesData from "./votes.json";
import { toast } from "react-hot-toast";
import Web3 from "web3";
 import NextLink from "next/link";

// Define interface for party data
interface Party {
  uid: number;
  NAME: string;
  DESCRIPTION: string;
  PARTY: string;
  LOGO: string;
  PHOTO?: string;
}

// Contract configuration
const contractAddress = "0x15628DA52e0Ad01261Ab417FfC055E17E2606d3c"; // Replace with your contract address
const contractABI = [
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

const Dashboard: React.FC = () => {
   
  const [parties, setParties] = useState<Party[]>([]);
  const [result, setResult] = useState<{ [key: number]: number }>({});
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    connectMetamask();
  }, []);

  useEffect(() => {
    if (account) {
      connectContract();
    }
  }, [account]);

  useEffect(() => {
    getAllElecteurs();
  }, [contract]);

  // Function to connect Metamask
  const connectMetamask = async () => {
    try {
      if ((window as any).ethereum) {
       
const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        toast.success("Connected to Metamask");
      } else {
        toast.error("Please install Metamask or use a Web3-enabled browser");
      }
    } catch (error) {
      console.error("Error connecting Metamask:", error);
      toast.error("An error occurred while connecting Metamask");
    }
  };

  // Function to connect to the contract
  const connectContract = async () => {
    try {
      const web3 = new Web3((window as any).ethereum);
      const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
      toast.success(`Connected to contract at address: ${contractAddress}`);
    } catch (error) {
      console.error("Error connecting to contract:", error);
      toast.error("Failed to connect to contract");
    }
  };

  // Function to fetch all electors
  const getAllElecteurs = async () => {
    try {
      if (contract) {
        const result = await contract.methods.getAllElecteurs().call();
        const mappedParties: Party[] = result.map((electeur: any) => ({
          uid: electeur.UID,
          NAME: `Electeur ${electeur.UID}`,
          DESCRIPTION: `Votes: ${electeur.voteCount}`,
          PARTY: `Party ${electeur.UID}`,
          LOGO: "", // Provide a logo URL or placeholder
          PHOTO: "", // Provide a photo URL or placeholder
        }));
        setParties(mappedParties);
        const voteCounts: { [key: number]: number } = result.reduce(
          (acc: { [key: number]: number }, electeur: any) => {
            acc[electeur.UID] = electeur.voteCount;
            return acc;
          },
          {}
        );
        setResult(voteCounts);
        const total = result.reduce(
          (acc: number, electeur: any) => acc + electeur.voteCount,
          0
        );
        setTotalVotes(total);
      } else {
        toast.error("Please connect your MetaMask account and connect the contract");
      }
    } catch (error) {
      console.error("Error fetching all electors:", error);
      toast.error("Failed to fetch electors");
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-110px",
          padding: "20px",
        }}
      >
        <NextLink href="/">
          <img
            width={80}
            alt="Roayaume du Maroc"
            src="../imgs/Coat_of_arms_of_Morocco.svg.png"
          />
        </NextLink>
      </div>
      <div className="mb-6 bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Statistics</h2>
        <div className="mt-4">
          <p>Total Voters: {totalVotes}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parties.map((party) => (
          <div key={party.uid} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold">{party.PARTY}</h3>
            {party.PHOTO && (
              <img
                src={party.LOGO}
                alt={party.NAME}
                className="mt-2 rounded-full h-20 w-20 object-cover"
              />
            )}
            <p className="mt-2">Votes: {result[party.uid] || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;