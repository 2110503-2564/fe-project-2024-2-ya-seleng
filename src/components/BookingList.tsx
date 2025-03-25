"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookingsItem, BookingJson } from "../../interfaces";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";

export default function BookingList() {
  const { data: session, status } = useSession();
  const router = useRouter(); // ใช้สำหรับเปลี่ยนหน้า
  const [bookingsItems, setBookingItems] = useState<BookingsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRemoveBooking = async (id: string) => {
    if (!session?.user?.token) return;

    const isConfirmed = window.confirm("Are you sure you want to remove this booking?");
    if (!isConfirmed) return;

    try {
      await deleteBooking(id, session.user.token);
      setBookingItems((prev) => prev.filter((item) => item._id !== id)); // ลบออกจาก state
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.token) return;
      try {
        setLoading(true);
        const bookings: BookingJson = await getBookings(session.user.token);
        setBookingItems(bookings.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.token) {
      fetchBookings();
    }
  }, [session?.user?.token]);

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
              <span className="font-medium">Hotel:</span> {bookingsItem.hotel.name}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              <span className="font-medium">User:</span> {bookingsItem.user.name}
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={() => handleRemoveBooking(bookingsItem._id)}
              >
                Remove Booking
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={() => router.push(`/update/${bookingsItem._id}`)}
              >
                Update Booking
              </button>
            </div>
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
/*"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BookingsItem, BookingJson } from "../../interfaces";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";

export default function BookingList() {
  const { data: session, status } = useSession();
  const [bookingsItems, setBookingItems] = useState<BookingsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRemoveBooking = async (id: string) => {
    if (!session?.user?.token) return;

    const isConfirmed = window.confirm("Are you sure you want to remove this booking?");
    if (!isConfirmed) return;

    try {
      await deleteBooking(id, session.user.token);
      setBookingItems((prev) => prev.filter((item) => item._id !== id)); // ลบออกจาก state
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.token) return;
      try {
        setLoading(true);
        const bookings: BookingJson = await getBookings(session.user.token);
        setBookingItems(bookings.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.token) {
      fetchBookings();
    }
  }, [session?.user?.token]);

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
              <span className="font-medium">Hotel:</span> {bookingsItem.hotel.name}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              <span className="font-medium">User:</span> {bookingsItem.user.name}
            </div>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={() => handleRemoveBooking(bookingsItem._id)}
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
*/
/*
"use client";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { BookingsItem, BookingJson} from "../../interfaces";
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
              <span className="font-medium">Hotel:</span> {bookingsItem.hotel.name}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              <span className="font-medium">User:</span> {bookingsItem.user.name}
            </div>
            <button
              // onClick={() => handleRemoveBooking(bookingsItem)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg"
              onClick={}
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
*/