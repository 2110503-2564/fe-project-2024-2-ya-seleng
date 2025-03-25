"use client";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { useDispatch } from "react-redux";
import { BookingItem } from "../../interfaces";

export default function BookingList() {
  const dispatch = useDispatch();
  const bookingItems = useAppSelector((state) => state.bookSlice.bookItems);

  const handleRemoveBooking = (bookingItem: BookingItem) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this booking?");
    if (isConfirmed) {
      dispatch(removeBooking(bookingItem));
    }
  };

  return (
    <>
      {bookingItems.length > 0 ? (
        bookingItems.map((bookingItem, index) => (
          <div key={index} className="bg-slate-200 rounded px-5 mx-5 my-2">
            <div className="text-xl">Name: {bookingItem.nameLastname}</div>
            <div className="text-xl">Tel: {bookingItem.tel}</div>
            <div className="text-xl">Hotel: {bookingItem.hotel}</div>
            <div className="text-xl">Date: {bookingItem.bookDate}</div>
            <div className="text-xl">Nights: {bookingItem.night}</div>
            <button
              onClick={() => handleRemoveBooking(bookingItem)}
              className="bg-red-500 text-white rounded p-2 mt-2"
            >
              Remove Booking
            </button>
          </div>
        ))
      ) : (
        <div className="text-xl text-center text-gray-600">
          No Hotel Booking.
        </div>
      )}
    </>
  );
}
