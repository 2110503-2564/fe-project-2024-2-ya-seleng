"use client"
import { useAppSelector } from "@/redux/store"
import getHotel from "@/libs/getHotel"
import { useState, useEffect } from "react"

export default function () {
    const bookingItems = useAppSelector((state) => state.bookSlice.bookItems)
    return (
        <>
            {bookingItems.length > 0 ? (
                bookingItems.map((bookingItem, index) => (
                    <div key={index} className="bg-slate-200 rounded px-5 mx-5 my-2">
                        <div className="text-xl">Name : {bookingItem.nameLastname}</div>
                        <div className="text-xl">Tel : {bookingItem.tel}</div>
                        <div className="text-xl">Hotel : {bookingItem.hotel}</div>
                        <div className="text-xl">Date : {bookingItem.bookDate}</div>
                        <div className="text-xl">Nights : {bookingItem.night}</div>
                    </div>
                ))
            ) : (
                <div className="text-xl text-center text-gray-600">
                    No Hotel Booking.
                </div>
            )}
        </>
    )
}
