"use client";
import DateReserve from "@/components/DateReserve";
import { authOptions } from "@/libs/auth";
import dayjs, { Dayjs } from "dayjs";
import { getServerSession } from "next-auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking as reduxBooking} from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interfaces";
import ErrorAlert from "@/components/ErrorAlert";
import SuccessAlert from "@/components/SuccessAlert";
import { useSession } from "next-auth/react";
import addBooking from "@/libs/addBooking";

export default function Booking() {
  const dispatch = useDispatch<AppDispatch>();

  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);
  const [nameLastname, setNameLastname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [hotel, setHotel] = useState<string>("");
  const [night, setNight] = useState<number>(0);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { data : session } = useSession();

  const makeBooking = async () => {
    console.log("Session Data:", session);
    console.log("Session User:", session?.user);
    console.log("Token:", session?.user?.token);

    if (!session?.user?.token) {
      console.error("Token is missing!");
      setShowErrorAlert(true);
      return;
    }

    if (nameLastname && contactNumber && hotel && reserveDate) {
      const item: BookingItem = {
        nameLastname,
        tel: contactNumber,
        hotel,
        bookDate: dayjs(reserveDate).format("YYYY/MM/DD"),
        night,
      };
      dispatch(reduxBooking(item));
      addBooking(night,dayjs(reserveDate).format("YYYY-MM-DD"),nameLastname,hotel,session?.user.token)
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } else {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      {showErrorAlert && (
        <ErrorAlert
          message="Please fill out all fields"
          onClose={() => setShowErrorAlert(false)}
        />
      )}
      {showSuccessAlert && (
        <SuccessAlert
          message="Booking successfully completed!"
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      <div className="text-xl font-medium">New Booking</div>
      <div className="w-fix space-y-2">
        <div className="text-md text-left text-gray-600">Booking Details</div>
        <DateReserve
          onHotelChange={setHotel}
          onNameChange={setNameLastname}
          onNumberChange={setContactNumber}
          onDateChange={setReserveDate}
          onNightChange={setNight}
        />
      </div>

      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
        name="Book Hotel"
        onClick={makeBooking}
      >
        Book Hotel
      </button>
    </main>
  );
}