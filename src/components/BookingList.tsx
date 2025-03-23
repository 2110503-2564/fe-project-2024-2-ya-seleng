'use client'
import { useAppSelector } from "@/redux/store"
import { useDispatch} from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../interface";

export default function BookingList(){
    const venueItems= useAppSelector((state)=>state.bookSlice.bookItems);
    const dispatch= useDispatch<AppDispatch>();
    return (
        <>
        <div className="mt-20 ml-10">
        {
           venueItems.length == 0? 
           <div className="mt-[100px]">
                'No Venue Booking'
           </div>
           : venueItems.map((bookingItem: BookingItem) => (
           <div className="flex flex-col m-10 bg-white p-5 rounded-xl text-amber-800 w-[400px]">
                <p>Reserver: {bookingItem.nameLastname}</p>
                <p>venue booked: {bookingItem.venue}</p>
                <p>booking date: {bookingItem.bookDate}</p>
                <p>Contact: {bookingItem.tel}</p>
                <button 
                    className="bg-amber-600 rounded-lg w-20 mt-5 text-amber-900 hover:bg-amber-300 p-1"
                    onClick={()=>{dispatch(removeBooking(bookingItem));}}
                >
                Delete
                </button>
           </div>))
        }
        </div>
        </>
    )
}