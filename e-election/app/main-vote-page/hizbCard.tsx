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
    
    // Add more properties as needed
  };
}

const HizbCard: React.FC<HizbCardProps> = ({ hizb }) => {
   

  return (
    <div>
      <Card className="max-w-[500px]">
         
     
        <CardBody className="flex justify-between">
                    <div className="flex items-center justify-around">
                        <div>
                           <img src={hizb.logo} alt={hizb.party}  style={
                                {
                                    width: "250px",
                                    height: "250px"
                                }
                            
                           }/> 

                             <span 
                                style={
                                    {
                                        fontSize: "1.2rem",
                                        fontWeight: "bold",
                                        color: "black"
                                    }
                                }
                             >
                                {hizb.party}
                             </span>

                             <div className="flex items-center justify-end">


                               <div className="p-5">
                                <Tooltip content={hizb.description} color="danger">
                                             ?
                                </Tooltip>
                                </div>

                                <div style={
                                    {
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        color: "black"
                                    }
                                
                                }>
                                  {hizb.name}
                                </div>
                                <Avatar

                                src={hizb.image}
                                size="lg"
                                className="w-20 h-20 text-large"
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
