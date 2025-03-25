"use client";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { BookingsItem, BookingJson } from "../../interfaces";
import getBookings from "@/libs/getBookings";
import { useEffect, useState } from "react";
import session from "redux-persist/es/storage/session";
import { useSession } from "next-auth/react";

export default function BookingList() {
  const dispatch = useDispatch();
  const { data: session, status } = useSession(); 
  const [bookingsItems, setBookingItems] = useState<BookingsItem[]>([]);
  const [loading, setLoading] = useState(true); 

  // const handleRemoveBooking = (bookingItem: BookingItem) => {
  //   const isConfirmed = window.confirm("Are you sure you want to remove this booking?");
  //   if (isConfirmed) {
  //     dispatch(removeBooking(bookingItem));
  //   }
  // };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.token) return;
      try {
        setLoading(true);
        console.log("Fetching bookings...");

        const bookings:BookingJson = await getBookings(session.user.token);
        console.log("Bookings fetched:", bookings);

        setBookingItems(bookings.data);
        console.log("Booking items:", bookings.data);

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
      {bookingsItems.length > 0 ? (
        bookingsItems.map((bookingsItem, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-6">
            <div className="text-lg text-gray-600 mb-4">
              <span className="font-medium">Nights:</span> {bookingsItem.nights}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              <span className="font-medium">Hotel:</span> {bookingsItem.data.name}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              <span className="font-medium">User:</span> {bookingsItem.user}
            </div>
            <button
              // onClick={() => handleRemoveBooking(bookingsItem)}
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