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
import Web3 from "web3";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
interface User {
  firstName: string;
  lastName: string;
}

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
import { Spinner } from "@nextui-org/react"; // Ensure you have Next UI installed

export default function App() {
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

  const [loding, setLoding] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Use the defined User type

  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const constraints = {
    facingMode: { exact: "user" },
  };
  const [isVoted, setIsVoted] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cin: "",
    birthDate: "",
  });
  const [timer, setTimer] = useState(5);

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
          "http://localhost:5000/api/image/check-face",
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
          toast.success("You are the right person");
          setStep(3);
        } else {
          console.log("Image is invalid");
          toast.error("Invalid Image");
          setImgSrc(null);
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
        toast.error("Invalid Image");
        setImgSrc(null);
      }
    } else {
      // Handle the case when webcamRef.current is null
      console.error("Webcam reference is not available.");
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

  const getUserByCinAndDateOfBirth = async () => {
    try {
      if (account) {
        console.log("methods", contract.methods);
        const UserInfo = await contract.methods
          .getUserByAddress(account)
          .call();
        if (
          formData.cin === UserInfo[3] &&
          formData.birthDate === UserInfo[2]
        ) {
          setUser({
            firstName: UserInfo[0],
            lastName: UserInfo[1],
          });
        toast.success("logged successfuly !");
        setStep(2);
        } else {
          toast.error(
            "L'adresse de metamask ou Cin ou date de naissance ne correspondent pas à un utilisateur"
          );
        }  
      } else {  
        toast.error("Veuillez d'abord vous connecter à MetaMask");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Les informations saisies ne correspondent à aucun utilisateur"
      );
    }
  };

  const getUserByAddress = async () => {
    try {
      if (account) {
        const UserInfo = await contract.methods
          .getUserByAddress(account)
          .call();
        console.log("User Info:", UserInfo);
      } else {
        toast.error("Please connect to MetaMask first");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while retrieving user info");
    }
  };

  const handleLogin = async () => {
    try {
      await connectMetamask();
      await connectContract();
      await getUserByCinAndDateOfBirth();
      toast.success("Welcome!");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de l'inscription");
    }
  };

  const toStep2 = async () => {
    try {
      // set the loading state to true
      setLoding(true);
      await connectMetamask();
      await connectContract();
      await getUserByCinAndDateOfBirth();

      // set the loading state to false
      setLoding(false);
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite lors de la connexion");
      setStep(1);
    }
  };

  const toRoute = () => {
    router.push("/main-vote-page");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-110px",
          marginBottom: "10px",
          padding: "20px",

          zIndex: 1000,
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
      <Card className="p-10" style={{ marginTop: step === 2 ? "-20px" : "" }}>
        <CardHeader className="pb-0 p-2 px-2 flex-col items-center">
          {step === 1 && (
            <h1 className="font-bold text-large text-danger text-bold ">
              ادخل معلوماتك
            </h1>
          )}
          {step === 2 && (
            <div>
              <h2>
                مرحبا {user?.firstName} {user?.lastName}
              </h2>
              <h1 className="font-bold text-large text-danger text-bold ">
                التقط الصورة
              </h1>
            </div>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {step === 1 && (
            <div>
              {loding && (
                <div className="flex justify-center items-center p-3 mb-1">
                  <div className="text-center">
                    <Spinner size="lg" color="primary" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 text-danger">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      type="text"
                      label="رقم البطاقة الوطنية"
                      required
                      isRequired
                      onChange={(e) =>
                        setFormData({ ...formData, cin: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <DateInput
                    label={"تاريخ الميلاد"}
                    placeholderValue={new CalendarDate(1995, 11, 6)}
                    isRequired
                    className="max-w-sm"
                    onChange={(value) =>
                      setFormData({ ...formData, birthDate: value.toString() })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <Card radius="none" shadow="none">
                <CardBody className="text-center text-danger text-bold">
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
                </CardBody>
              </Card>
              <div className="flex justify-center flex-col gap-4 text-danger">
                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Webcam
                      style={{
                        width: "80%",
                        height: "100%",
                        borderRadius: "30px",
                        border: "2px solid red",
                        marginLeft: "45px ",
                      }}
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={constraints}
                    />
                  </div>
                </div>
                <div
                  className="flex flex-col items-center justify-center   "
                  style={{
                    marginBottom: "-30px",
                  }}
                >
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
          )}
        </CardBody>
        {step == 1 && (
          <div className="flex flex-col items-center justify-center mt-5  ">
            <Button color="danger" variant="bordered" onClick={toStep2}>
              ولوج
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center mt-5  ">
            {isVoted && (
              <div>
                <p>لقد قمت بالتصويت مسبقا</p>
                <Button
                  color="danger"
                  variant="bordered"
                  onClick={() => {
                    alert("out");
                  }}
                >
                  خروج
                </Button>
              </div>
            )}

            {!isEligible && (
              <div>
                <p>لا يمكنك التصويت لانك لا تتوفر فيك الشروط اللازمة</p>
                <Button
                  color="danger"
                  variant="bordered"
                  onClick={() => {
                    alert("out");
                  }}
                >
                  خروج
                </Button>
              </div>
            )}

            {!isVoted && isEligible && (
              <Card
                className="w-full md:w-96 mx-auto   shadow-lg rounded-lg overflow-hidden"
                style={{
                  marginTop: "-50px",
                }}
              >
                <div className="p-6 flex flex-col items-center bg-white">
                  <h4 className="text-center text-gray-800 mb-4">
                    يمكنك التصويت الان
                  </h4>
                  <Button
                    color="danger"
                    variant="bordered"
                    onClick={toRoute}
                    className="w-full"
                  >
                    التالي
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
