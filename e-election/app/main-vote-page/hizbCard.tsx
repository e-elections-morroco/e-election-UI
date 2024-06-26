import React from "react";
import { Card, CardBody, Tooltip, Avatar } from "@nextui-org/react";

interface HizbCardProps {
  hizb: {
    uid: number;
    image: string;
    logo: string;
    name: string;
    party: string;
    description: string;
    isVoted: boolean;
  };
}

const HizbCard: React.FC<HizbCardProps> = ({ hizb }) => {
  return (
    <div className="w-full    p-4" style={
      {
        width: "300px",
         
      }
    }>
      <Card className="max-w-[300px] w-full relative shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <CardBody className="p-5 relative flex flex-col items-center">
          {hizb.isVoted && (
            <div
              className="absolute inset-0 bg-red-500 bg-opacity-55 flex items-center justify-center text-white text-9xl font-bold"
              style={{ zIndex: 10 }}
            >
              X
            </div>
          )}
          <img
            src={hizb.logo}
            alt={hizb.party}
            className="w-60 h-60 object-contain mb-4"
          />
          <Avatar
            src={hizb.image}
       
            className="border-2 border-gray-300 shadow-sm mb-4"
          />
          <div className="text-2xl font-bold mb-2 text-center">{hizb.party}</div>
          <Tooltip content={<span>{hizb.description}</span>} color="primary">
            <div className="cursor-pointer text-lg text-blue-600 underline mb-4 text-center">
              {hizb.name}
            </div>
          </Tooltip>
        </CardBody>
      </Card>
    </div>
  );
};

export default HizbCard;
