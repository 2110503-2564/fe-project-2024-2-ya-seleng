import BookingList from "@/components/BookingList";
import getBookings from "@/libs/getBookings";
import VenueCatalog from "@/components/VenueCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function MyBooking () {
    const booking = getBookings()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Booking List</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <VenueCatalog venuesJson={booking}/>
            </Suspense>
        </main>
    );
}
/*
export default function MyBooking() {
    return (
        <div className="my-booking">
            <h1 className="text-3xl font-semibold mb-4">My Booking</h1>
            <BookingList />
        </div>
    );
}
*/
