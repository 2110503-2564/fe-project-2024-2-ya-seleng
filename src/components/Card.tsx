"use client"
import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { Rating } from "@mui/material";
import { useState } from "react";

export default function Card( { venueName, imgSrc, onCompare } : { venueName:string, imgSrc:string, onCompare?:Function } ){
  
  const [value, setValue] = useState<number | null>(0);

  return(
   <InteractiveCard contentName={venueName}>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image src={imgSrc}
        alt='venue'
        fill={true}
        className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[15%] p-[10px]">
        <h2>{venueName}</h2>
      </div>
      {
        onCompare? 
        <Rating 
          id={`${venueName} Rating`} 
          name={`${venueName} Rating`} 
          data-testid={`${venueName} Rating`} 
          onChange={(event, newValue) => {
            setValue(newValue);
            onCompare(venueName,newValue)
          }}
          onClick={ (e)=>{e.stopPropagation();} }
        /> : ''
      }
    </InteractiveCard>
  );
}
