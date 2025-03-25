import { error } from "console"
import { TIMEOUT } from "dns"
import { VenueItemJson } from "../../interfaces";

export default async function getVenue(vid:string) : Promise<VenueItemJson>{
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch(`https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${vid}`)
    if(!response.ok){
        throw new Error("Failed to fetch venues")
    }
    // console.log(response.json)
    return await response.json() 
}