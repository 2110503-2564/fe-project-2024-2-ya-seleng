export default async function getHotels() {
    // add timeout for loading delay testing
    await new Promise((resolve)=>setTimeout(resolve, 300))
    
    const response = await fetch("http://localhost:5050/api/v1/hotels")
    if(!response.ok){
        throw new Error("Failed to fetch hotels")
    }
    return await response.json()
}