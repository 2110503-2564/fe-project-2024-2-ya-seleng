"use client";
import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/libs/auth";
import dayjs, { Dayjs } from "dayjs";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interfaces";

export default function Booking() {

  const dispatch = useDispatch<AppDispatch>()

  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [nameLastname, setNameLastname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [hotel, setHotel] = useState<string>("");
  const [night , setNight] = useState<number>(0);

  const makeBooking = () => {
    if(nameLastname&&contactNumber&&hotel&&reserveDate) {
      const item:BookingItem = {
        nameLastname: nameLastname,
        tel: contactNumber,
        hotel: hotel,
        bookDate: dayjs(reserveDate).format("YYY/MM/DD"),
        night: night
      }
      dispatch(addBooking(item))
    }
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Booking</div>
      <div className="w-fix space-y-2">
        <div className="text-md text-left text-gray-600">Booking Details</div>
        <DateReserve  onHotelChange={(value:string)=>setHotel(value)} onNameChange={(value:string)=>setNameLastname(value)} onNumberChange={(value:string)=>setContactNumber(value)} onDateChange={(value:Dayjs)=>setReserveDate(value)} onNightChange={(value:number)=>setNight(value)}/>
      </div>

      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 px-2 shadow-sm text-white"
        name="Book Hotel"
        onClick={makeBooking}
      >
        Book Hotel
      </button>
    </main>
  );
}
