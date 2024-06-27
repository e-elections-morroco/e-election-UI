"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Image,
  Button,
  CardFooter,
  Modal,
  useModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import HizbCard from "./hizbCard";
import { SearchIcon } from "./SearchIcon";
import { motion } from "framer-motion";
import Web3 from "web3";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import data from "@/data/votes.json";
import VoiceChatIcon from "@/components/voicehelper";
const contractAddress1 = "0xfa0d7dA8D1024D4b411C0f55B635c171F7ab9DD5"; // Remplacez ceci par l'adresse du contrat User
const contractABI1 = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "getUserByAddress",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isVoted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_cin",
        type: "string",
      },
      {
        internalType: "string",
        name: "_dateOfBirth",
        type: "string",
      },
    ],
    name: "getUserByCinAndDateOfBirth",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isVoted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_firstName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_lastName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_birthDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "_cin",
        type: "string",
      },
      {
        internalType: "string",
        name: "_email",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ville",
        type: "string",
      },
      {
        internalType: "string",
        name: "_phone",
        type: "string",
      },
    ],
    name: "setUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userAddresses",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "string",
        name: "firstName",
        type: "string",
      },
      {
        internalType: "string",
        name: "lastName",
        type: "string",
      },
      {
        internalType: "string",
        name: "birthDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "CIN",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "string",
        name: "ville",
        type: "string",
      },
      {
        internalType: "string",
        name: "phone",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isVoted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_userAddress",
        type: "address",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress2 = "0x15628DA52e0Ad01261Ab417FfC055E17E2606d3c"; // Remplacez ceci par l'adresse du contrat Electeur
const contractABI2 = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "electeurKeys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "electeurs",
    outputs: [
      {
        internalType: "uint256",
        name: "UID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllElecteurs",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "UID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct Electeur.ElecteurInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_UID",
        type: "uint256",
      },
    ],
    name: "getElecteur",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_UID",
        type: "uint256",
      },
    ],
    name: "setElecteur",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_UID",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
interface Hizb {
  uid: number;
  LOGO: string;
  PHOTO: string;
  NAME: string;
  DESCRIPTION: string;
  PARTY: string;
}

export default function App() {
  const [isVoted, setIsVoted] = useState<number>(-1);
  const [formData, setFormData] = useState<{ uid: number }>({ uid: 1 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const router = useRouter();
  let contract2: any;
  let account: string | null = null;
  let contract1: any;

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
        contract2 = new (window as any).web3.eth.Contract(
          contractABI2,
          contractAddress2
        );
        contract1 = new (window as any).web3.eth.Contract(
          contractABI1,
          contractAddress1
        );
        console.log("Connected to contract2 at address: " + contractAddress2);
        console.log("Connected to contract1 at address: " + contractAddress1);
      } else {
        console.log("Please connect to MetaMask first");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const vote = async () => {
    try {
      if (account && contract2) {
        await contract1.methods.vote(account).send({ from: account });
        await contract2.methods.vote(formData.uid).send({ from: account });
        await sendVoteSuccessEmail();
        toast.success("You voted successfully, Check your Email !");
        router.push("/");
      } else {
        toast.error("Please connect to MetaMask first");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "There was a problem with your vote or you have already voted!"
      );
    }
  };

  const sendVoteSuccessEmail = async () => {
    try {
      const Myemail = localStorage.getItem("email") ?? "";
      const firstName = localStorage.getItem("firstName") ?? "";
      const lastName = localStorage.getItem("lastName") ?? "";
      const formData = new FormData();
      formData.append("to", Myemail);
      formData.append("firstname", firstName);
      formData.append("lastname", lastName);

      const response = await fetch(
        "http://localhost:5000/api/email/vote-success",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send the email");
      }

      const result = await response.json();
      if (result.success) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send the email");
      }
    } catch (error) {
      console.error("An error occurred while sending the email", error);
    }
  };

  const handleClick = async (uid: number) => {
    setSelectedIndex(uid); // Set selectedIndex to the uid of the clicked hizb
    onOpen(); // Open the modal
  };

  const handleConfirm = async () => {
    onClose();
    if (isVoted === selectedIndex) {
      setIsVoted(-1);
      return;
    }
    setIsVoted(selectedIndex!);
    formData.uid = selectedIndex!;
    console.log(formData);

    await connectMetamask();
    await connectContract();
    await vote(); // Trigger the vote function after connecting to MetaMask and the contract
  };

  const filteredHizbs = data.data.filter(
    (hizb: Hizb) =>
      hizb.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hizb.PARTY.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <VoiceChatIcon />
      <div
        className="flex items-center justify-center"
        style={{
          marginTop: "-40px",
        }}
      >
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
        {filteredHizbs.map((hizb: Hizb) => (
          <motion.div
            key={hizb.uid}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              console.log("hizb.uid :");
              console.log(hizb.uid);
  
              handleClick(hizb.uid);
            }} // Pass uid instead of index
          >
            <div className="p-12" style={{ flex: "0 0 33.3333%" }}>
              <HizbCard
                hizb={{
                  uid: hizb.uid,
                  logo: hizb.LOGO,
                  image: hizb.PHOTO,
                  name: hizb.NAME,
                  description: hizb.DESCRIPTION,
                  party: hizb.PARTY,
                  isVoted: isVoted === hizb.uid,
                }}
              />
            </div>
            {(hizb.uid + 1) % 3 === 0 && <div className="w-full" />}
          </motion.div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        className="flex items-center justify-center"
      >
        <ModalContent className="modal-content bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
          <ModalHeader className="modal-header flex flex-col gap-1 py-4 px-6 text-lg text-center border-b border-gray-200 dark:border-gray-600">
            تأكيد التصويت
          </ModalHeader>
          <ModalBody className="py-6 px-6 text-center">
            هل أنت متأكد من التصويت لهذا الحزب؟
          </ModalBody>
          <ModalFooter className="modal-footer flex justify-center gap-4 py-4 px-6 border-t border-gray-200 dark:border-gray-600">
            <Button
              onPress={onClose}
              className="border border-red-500 text-red-500 rounded-lg px-4 py-2 hover:bg-red-100 hover:text-red-700"
            >
              إلغاء
            </Button>
            <Button
              onPress={handleConfirm}
              className="border border-blue-500 text-blue-500 rounded-lg px-4 py-2 hover:bg-blue-100 hover:text-blue-700"
            >
              تأكيد التصويت
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
