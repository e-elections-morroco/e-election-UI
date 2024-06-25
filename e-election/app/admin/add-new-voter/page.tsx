"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Image,
  DateInput,
  Button,
  CardFooter,
  User,
  Avatar,
} from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import Webcam from "react-webcam";
import { toast } from "react-hot-toast";
import Web3 from "web3";
import { useRouter } from "next/navigation";
const contractAddress = "0xfa0d7dA8D1024D4b411C0f55B635c171F7ab9DD5"; // Remplacez ceci par l'adresse du contrat User
const contractABI = [
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
import NextLink from "next/link";

// import the axios to handle a backend request
import axios from "axios";

export default function App() {
  const router = useRouter();
  let contract: any;
  let account: any;

  const base64ToBlob = (base64: any, contentType: any) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  const base64ToFile = (base64: any, filename: any) => {
    const contentType = base64.split(",")[0].split(":")[1].split(";")[0];
    const blob = base64ToBlob(base64, contentType);
    return new File([blob], filename, { type: contentType });
  };

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
        await contract.methods
          .setUser(
            account,
            formData.firstName,
            formData.lastName,
            formData.birthDate,
            formData.cin,
            formData.email,
            formData.city,
            formData.phone
          )
          .send({ from: account });
        toast.success("Voter added successfully!");
        router.push("/");
      } else {
        toast.error("Veuillez d'abord vous connecter à MetaMask");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Une erreur s'est produite lors de la définition des informations utilisateur"
      );
    }
  };

  const handleRegister = async () => {
    try {
      await connectMetamask();
      await connectContract();
      await setUserInfo();
     
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'inscription");
    }
  };

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
    picture: "",
  });
  const [timer, setTimer] = useState(5);

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
  };
  const takePicture = async () => {
    if (webcamRef.current) {
      const imageSrc = (webcamRef.current as any).getScreenshot(); // Type assertion
      const imageFile = base64ToFile(imageSrc, "uploaded_image.png");

      setImgSrc(imageSrc);
      console.log("imageFile :", imageFile);

      const formData2 = new FormData();
      formData2.append("image", imageFile);
      formData2.append("cin", formData.cin); // Ensure you include the cin field if it's required by the API

      console.log("formData :", formData);
      for (const pair of formData2.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Log the FormData contents (for debugging purposes)

      // 1 check if the image is valide or not BY calling the api  /api/image/is-valid
      try {
        const response = await axios.post(
          "http://localhost:5000/api/image/save-image",
          formData2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Response:");
        console.log(response.data);
        if (response.data.valid_image) {
          console.log("Image is valid");
          toast.success("Picture Saved Successfully");
          setStep(3);
        } else {
          console.log("Image is invalid");
          toast.error("Invalid Image");
          setImgSrc(null);
        }

       
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          toast.error("Invalid Image ");
        } else if (error.request) {
          console.error("No response received:", error.request);
          toast.error("Invalid Image ");
        } else {
          console.error("Error setting up request:", error.message);
          toast.error("Invalid Image ");
        }

        // CLEAR THE IMAGE
        setImgSrc(null);
      }
      
    } else {
      // Handle the case when webcamRef.current is null
      console.error("Webcam reference is not available.");
    }
  };

  return (
    <div>
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

      <Card className="p-10">
        <CardBody className="overflow-visible py-2">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <CardHeader
                className="pb-0   flex-col items-center text-danger"
                style={{
                  marginTop: "-30px",
                }}
              >
                <h1 className="font-bold text-large">Add the voter info</h1>
              </CardHeader>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  label="First name"
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <Input
                  type="text"
                  label="Last name"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="email"
                  label="Email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  type="tel"
                  label="Phone number"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <DateInput
                  label={"Birth date"}
                  placeholderValue={new CalendarDate(1995, 11, 6)}
                  className="max-w-sm"
                  onChange={(value) =>
                    setFormData({ ...formData, birthDate: value.toString() })
                  }
                />
                <Input
                  type="text"
                  label="CIN"
                  onChange={(e) =>
                    setFormData({ ...formData, cin: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  label=" city"
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div  style={
                {
                  
               
                  padding: "20px",
                  marginTop: "-90px",

                }
              }>
                <Card radius="none" shadow="none">
                  <CardBody className="text-center text-danger text-bold"></CardBody>
                  <CardHeader className="flex justify-center pt-8">
                    <span
                      style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "red",
                        marginTop: "-20px",
                      }}
                    >
                      {timer}
                    </span>
                  </CardHeader>
                </Card>
               
                <div>
                  <Webcam style={
                    {
                      width: "100%",
                      height: "100%",
                      borderRadius: "30px",
                      border: "2px solid red",
                    }
                  } videoConstraints={constraints} ref={webcamRef} />
                  {imgSrc && <img src={imgSrc} alt="Captured" />}
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
        <Card className="w-full md:w-96 bg-white shadow-lg rounded-lg overflow-hidden">
        <CardBody className="p-6 flex flex-col items-center">
          <Avatar
            size="lg"
            src={imgSrc ? imgSrc : ""}
            className="w-24 h-24 rounded-full shadow-md"
          />
          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </p>
            <p className="text-sm text-gray-500">{formData.email}</p>
            <p className="text-sm text-gray-500">{formData.phone}</p>
            <p className="text-sm text-gray-500">Birth Date: {formData.birthDate}</p>
            <p className="text-sm text-gray-500">CIN: {formData.cin}</p>
            <p className="text-sm text-gray-500">City: {formData.city}</p>
          </div>
        </CardBody>
      </Card>
      
          )}
        </CardBody>
        <div className="flex flex-col items-center justify-center mt-5">
          {step === 1 && (
            <Button onClick={toStep2} color="danger" variant="bordered">
              Next
            </Button>
          )}
          {step == 2 && (
            <Button onClick={startTimer} color="danger" variant="bordered">
              Take Picture
            </Button>
          )}
          {step == 3 && (
            <Button onClick={handleRegister} color="danger" variant="bordered">
              Save Voter
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
