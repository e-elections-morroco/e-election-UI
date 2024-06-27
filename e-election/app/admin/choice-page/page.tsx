"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

const AdminChoicePage = () => {
  const router = useRouter();

  const toRoute = (route: string) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen   " style={
      {
        marginTop : "-200px",
      }
    }>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        
    
          padding: "20px",
        }}
      >
        <NextLink href="/">
          <img
            width={90}
            alt="Roayaume du Maroc"
            src="../imgs/Coat_of_arms_of_Morocco.svg.png"
          />
        </NextLink>
      </div>
       <div className="space-y-4 w-full max-w-sm">
        <Button
          onClick={() => toRoute("/admin/dashboard")}
          className="w-full border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-100 transition duration-300"
        >
          Go to Dashboard
        </Button>
        <Button
          onClick={() => toRoute("/admin/add-new-voter")}
          className="w-full border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-100 transition duration-300"
        >
          Add New Voter
        </Button>
      </div>
    </div>
  );
};

export default AdminChoicePage;
