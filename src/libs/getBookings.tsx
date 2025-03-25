import { error } from "console"
import { TIMEOUT } from "dns"

export default async function getBookings(token:string) {
    await new Promise((resolve)=>setTimeout(resolve, 300))
    
    const response = await fetch("https://ya-seleng-back-9x4ws9udo-hattakorn-hattakarns-projects.vercel.app/api/v1/bookings",
        {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
        }
    )
    if(!response.ok){
        throw new Error("Failed to fetch bookings")
    }
    return await response.json()
}