export default async function getBookings() {
    // add timeout for loading delay testing
    await new Promise((resolve)=>setTimeout(resolve, 300))
    
    const response = await fetch("http://localhost:5050/api/v1/bookings")
    if(!response.ok){
        throw new Error("Failed to fetch venues")
    }
    return await response.json()
}