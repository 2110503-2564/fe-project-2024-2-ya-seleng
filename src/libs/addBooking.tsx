export default async function addBooking(
    night: number,
    bookingDate: string,
    user: string,
    hotelID: string,
    token: string
  ) {
    const response = await fetch(
      `http://localhost:5050/api/v1/hotels/${hotelID}/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingDate,
          user,
          hotel: hotelID,
          nights: night,
        }),
      }
    );
  
    if (!response.ok) {
      throw new Error("Failed to create booking");
    }
    else {
      console.log("success")
    }
    return await response.json();
  }  