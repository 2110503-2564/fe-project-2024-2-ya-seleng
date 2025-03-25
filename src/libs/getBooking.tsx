export default async function getBooking(id:string) {
    const response = await fetch(`http://localhost:5050/api/v1/bookings/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch venue")
    }
    return await response.json()
}