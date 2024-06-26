"use client";
import React, { useEffect, useState } from "react";
import votesData from "@/data/votes.json";
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
  const [candidates, setCandidates] = useState<Party[]>([]);
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

  useEffect(() => {
    // Set initial candidates from JSON data
    setCandidates(votesData.data);
  }, []);

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
      console.log(`Connected to contract at address: ${contractAddress}`);
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

        const uniqueElecteurs = new Map<number, number>();
        result.forEach((electeur: { UID: number; voteCount: number }) => {
          if (!uniqueElecteurs.has(electeur.UID)) {
            uniqueElecteurs.set(Number(electeur.UID), Number(electeur.voteCount));
          }
        });

        console.log("Unique electors:");
        console.log(uniqueElecteurs);
        uniqueElecteurs.forEach((voteCount, UID) => {
          console.log(`UID: ${UID}, Nombre de Votes: ${voteCount}`);
        });

        const updatedCandidates = votesData.data.map((candidate: Party) => {
          const voteCount = uniqueElecteurs.get(candidate.uid) || 0;
          return { ...candidate, DESCRIPTION: `${candidate.DESCRIPTION} (Votes: ${voteCount})` };
        });

        setCandidates(updatedCandidates);

        const voteCounts: { [key: number]: number } = Array.from(uniqueElecteurs.entries()).reduce(
          (acc: { [key: number]: number }, [UID, voteCount]) => {
            acc[UID] = voteCount;
            return acc;
          },
          {}
        );

        setResult(voteCounts);

        const total = Array.from(uniqueElecteurs.values()).reduce(
          (acc: number, voteCount: number) => acc + voteCount,
          0
        );

        setTotalVotes(total);
        console.log("All electors:", result);
      } else {
        console.error("Please connect your MetaMask account and connect the contract");
      }
    } catch (error) {
      console.error("Error fetching all electors:", error);
      toast.error("Failed to fetch electors");
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      <div style={{ display: "flex", justifyContent: "center", marginTop: "-110px", padding: "20px" }}>
        <NextLink href="/">
          <img width={80} alt="Roayaume du Maroc" src="../imgs/Coat_of_arms_of_Morocco.svg.png" />
        </NextLink>
      </div>
      <div className="mb-6 bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Statistics</h2>
        <div className="mt-4">
          <p>Total Voters: {totalVotes}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {candidates.map((candidate) => (
          <div key={candidate.uid} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold">{candidate.NAME}</h3>
            {candidate.PHOTO && (
              <img src={candidate.LOGO} alt={candidate.NAME} className="mt-2 h-20 w-40 object-cover" />
            )}
            
             
            <p className="mt-2">Party: {candidate.PARTY}</p>
            <p className="mt-2 text-danger">Votes: {result[candidate.uid] || 0}</p>
          </div>
        ))}
     

      </div>
    </div>
  );
};

export default Dashboard;
