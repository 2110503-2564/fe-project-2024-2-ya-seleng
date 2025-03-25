import { error } from "console"
import { TIMEOUT } from "dns"
import { HotelItemJson } from "../../interfaces";

export default async function getHotel(id:string) {
    const response = await fetch(`https://ya-seleng-back-9x4ws9udo-hattakorn-hattakarns-projects.vercel.app/api/v1/hotels/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch hotel")
    }
    return await response.json()
}