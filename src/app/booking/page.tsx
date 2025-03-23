"use client";
import BookingLayout from "./layout"
import DateReserve from "@/components/DateReserve";
// import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch} from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking,removeBooking } from "@/redux/features/bookSlice";
import { useAppSelector } from "@/redux/store";
// import getUserProfile from "@/libs/getUserProfile";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { BookingItem } from "../../../interface";

export default  function Booking() {
    // const session =await getServerSession(authOptions);
    // if(!session||!session.user.token) return null;
    // const profile=await getUserProfile(session.user.token);
    // var createdAt = new Date(profile.data.createdAt);
    // console.log(profile);
    const dispatch= useDispatch<AppDispatch>();

    const [reserveDate,setReserveDate]=useState<Dayjs|null>(null);
    const [reserveLocation,setReserveLocation]=useState<string>("Bloom");
    const [reserveName,setReserveName] = useState<string|null>(null);
    const [tel,setTel] = useState<string|null>(null);
    const venueItems= useAppSelector((state)=>state.bookSlice.bookItems)
    const makeBooking= (()=>{
        if(reserveDate && reserveLocation && reserveName && tel){
            //delete old one (if exist)
            const existingBooking = venueItems.find(
                (item: BookingItem) =>
                    item.nameLastname === reserveName &&
                    item.venue === reserveLocation &&
                    item.bookDate === dayjs(reserveDate).format("MM/DD/YYYY")
            );
            if (existingBooking) {
                dispatch(removeBooking(existingBooking));
            }

            const booking:BookingItem={
                nameLastname: reserveName,
                tel: tel,
                venue: reserveLocation,
                bookDate: dayjs(reserveDate).format("MM/DD/YYYY"),
            };
            dispatch(addBooking(booking));
        }
    });
    return (
        
            <div>
                <h2 className="text-xl text-white mt-20 ml-20 mb-5">Venue Booking</h2>
                <div className="flex flex-col ml-10 bg-white p-10 pt-[10px] pb-[20px] w-[600px] rounded-lg">
                    
                        <DateReserve 
                            onDateChange={(value:Dayjs)=>{setReserveDate(value)}}
                            onLocationChange={(value:string)=>{setReserveLocation(value)}}
                            onNameChange={(value:string)=>{setReserveName(value)}}
                            onTelChange={(value:string)=>{setTel(value)}}
                            />
                        <button
                            name="Book Venue"
                            className="w-[100px] rounded-md h-[30px] text-xs mt-[20px] ml-0 bg-amber-600 hover:bg-amber-800"
                            onClick={()=>{makeBooking()}}
                        >
                            Book Venue
                        </button>
                </div>
            </div>
        
    );
}