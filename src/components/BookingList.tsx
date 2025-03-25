"use client";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { BookingItem } from "../../interfaces";
import getBookings from "@/libs/getBookings";
import { useEffect, useState } from "react";
import session from "redux-persist/es/storage/session";
import { useSession } from "next-auth/react";

const hotels = [
  { "id": "67c68f9f3f9cc1fbb3bf7b7d", "name": "Owen Hettinger Hotel" },
  { "id": "67c6a3253f9cc1fbb3bf7c6a", "name": "Chester Greenfelder DDS Hotel" },
  { "id": "67c68fa73f9cc1fbb3bf7b95", "name": "Robin Gulgowski Hotel" },
  { "id": "67c68fa63f9cc1fbb3bf7b92", "name": "Wilbert Kilback Hotel" },
  { "id": "67c68fa53f9cc1fbb3bf7b8f", "name": "Christy Kris Hotel" },
  { "id": "67c68fa43f9cc1fbb3bf7b8c", "name": "Al Weber Hotel" },
  { "id": "67c68fa33f9cc1fbb3bf7b89", "name": "Jonathon Lemke Hotel" },
  { "id": "67c68fa23f9cc1fbb3bf7b86", "name": "Miss Mamie Kutch Hotel" },
  { "id": "67c68fa13f9cc1fbb3bf7b83", "name": "Judith Bernier Hotel" },
  { "id": "67c68fa03f9cc1fbb3bf7b80", "name": "Mr. Mamie Murray Hotel" },
  { "id": "67c55fda7fddb34ab50a1cb3", "name": "Norma McGlynn" },
  { "id": "67c68f8a3f9cc1fbb3bf7b7a", "name": "Geoffrey Quitzon" },
  { "id": "67c68f863f9cc1fbb3bf7b77", "name": "Mrs. Holly Hand" },
  { "id": "67c68f853f9cc1fbb3bf7b74", "name": "Warren Wuckert" },
  { "id": "67c68f843f9cc1fbb3bf7b71", "name": "Maria Feest" },
  { "id": "67c68f833f9cc1fbb3bf7b6e", "name": "Eugene Zboncak" },
  { "id": "67c68f823f9cc1fbb3bf7b6b", "name": "Pearl Grant IV" },
  { "id": "67c68f7e3f9cc1fbb3bf7b68", "name": "Juana Macejkovic" },
  { "id": "67c55fde7fddb34ab50a1cb9", "name": "Miss Floyd Thompson" },
  { "id": "67c55fdd7fddb34ab50a1cb6", "name": "Tracy VonRueden" }
];

export default function BookingList() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession(); // Adding status to check session loading state
  const [bookingItems, setBookingItems] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const getHotelName = (hotelID: string) => {
    const hotel = hotels.find((h) => h.id === hotelID);
    return hotel ? hotel.name : "Unknown Hotel"; 
  };

  const handleRemoveBooking = (bookingItem: BookingItem) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this booking?");
    if (isConfirmed) {
      dispatch(removeBooking(bookingItem));
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.token) return;
      try {
        setLoading(true);
        console.log("Fetching bookings...");
        const bookings = await getBookings(session.user.token);
        console.log("Bookings fetched:", bookings);
        setBookingItems(bookings);
        console.log("Booking items:", bookingItems);
      } catch (error) {
        console.error("Failed to fetch bookings:", error); 
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.token) {
      fetchBookings();
    }
  }, [session?.user?.token, session?.user?.role]);

  if (status === "loading" || loading) {
    return <div>Loading bookings...</div>; 
  }

  return (
    <div className="p-4">
      {bookingItems.length > 0 ? (
        bookingItems.map((bookingItem, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-6">
            <div className="text-2xl font-semibold text-gray-800 mb-2">{bookingItem.nameLastname}</div>
            <div className="text-lg text-gray-600 mb-1">
              <span className="font-medium">Tel:</span> {bookingItem.tel}
            </div>
            <div className="text-lg text-gray-600 mb-1">
              <span className="font-medium">Hotel:</span> {getHotelName(bookingItem.hotel)}
            </div>
            <div className="text-lg text-gray-600 mb-1">
              <span className="font-medium">Date:</span> {bookingItem.bookDate}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              <span className="font-medium">Nights:</span> {bookingItem.night}
            </div>
            <button
              onClick={() => handleRemoveBooking(bookingItem)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Remove Booking
            </button>
          </div>
        ))
      ) : (
        <div className="text-xl text-center text-gray-600">
          No Hotel Booking Available.
        </div>
      )}
    </div>
  );
}