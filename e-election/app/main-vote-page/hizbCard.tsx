import React, { ChangeEvent } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Select, Tooltip, Avatar } from "@nextui-org/react";

interface HizbCardProps {
  hizb: {
    uid: number;
    image: string;
    logo: string;
    name: string;
    party: string;
    description: string;
    isVoted : boolean;
    
    // Add more properties as needed
  };
}

const HizbCard: React.FC<HizbCardProps> = ({ hizb }) => {
   

  return (
    <div>
   <Card className="max-w-[500px] relative">
  <CardBody className="flex justify-between relative">
    {hizb.isVoted && (
      <span
        className="absolute inset-0 text-danger text-bold flex items-center justify-center"
        style={{ fontSize: "20.5rem" , fontWeight: "10" , marginTop: "-130px"}}
      >
        X
      </span>
    )}
    <div className="flex items-center justify-around">
      <div>
        <img
          src={hizb.logo}
          alt={hizb.party}
          style={{
            width: "250px",
            height: "250px"
          }}
        />
        <span
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "black"
          }}
        >
          {hizb.party}
        </span>
        <div className="flex items-center justify-end">
          <div className="p-5">
            <Tooltip content={hizb.description} color="danger">
              ?
            </Tooltip>
          </div>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "black"
            }}
          >
            {hizb.name}
          </div>
          <Avatar
            src={hizb.image}
            size="lg"
            style={{
              width: "50px",
              height: "50px"
            }}
            className="text-large"
          />
        </div>
      </div>
    </div>
  </CardBody>
</Card>


    </div>
  );
};

export default HizbCard;
