import { error } from "console"
import { TIMEOUT } from "dns"
import { HotelItemJson } from "../../interfaces";

export default async function getHotel(id:string) {
    const response = await fetch(`http://localhost:5050/api/v1/hotels/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch hotel")
    }
    return await response.json()
}