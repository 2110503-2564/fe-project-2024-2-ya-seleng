'use client'
import { useReducer, useState } from "react";
import Card from "./Card";
import Link from "next/link";
export default function CardPanel(){

    const cardReducer = (
        venueList: Map<string, number>, action: {type: string, venueName: string, rating?: number})=>{
        switch(action.type){
            case 'add': {
                const newVenueList = new Map(venueList);
                newVenueList.set(action.venueName, action.rating??0);
                return newVenueList;
            }
            case 'remove': {
                const newVenueList = new Map(venueList);
                newVenueList.delete(action.venueName);
                return newVenueList;
            }
            default: {
                return venueList;
            }
        }
    }

    let defaultVenue = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
    ]);

    const [ venueList, dispatchCompare ] = useReducer(cardReducer, defaultVenue)

    /*
        Mock Data for Demontration Only
    */
    const mockVenueRepo = [
        {vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
        {vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg"},
        {vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg"},
   ]

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                {
                    mockVenueRepo.map((venueItem)=>(
                        <Link href={`/venue/${venueItem.vid}`} className="w-1/5">
                            <Card venueName={venueItem.name} imgSrc={venueItem.image} onCompare={ (venue:string, rating:number)=>dispatchCompare({type:'add',venueName:venue, rating:rating}) }/>
                        </Link>
                    ))
                }
            </div>
            <div className="w-full text-xl font-medium">Compare List: { venueList.size }</div>
            {Array.from(venueList).map(([venueName, rating]) => (<div key={venueName} onClick={()=>dispatchCompare({type:'remove', venueName:venueName})} data-testid = {venueName}>{venueName} : {rating}</div> )) }
        </div>
    );
}