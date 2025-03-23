import BookingList from "@/components/BookingList";

export default function MyBooking() {
    return (
        <div className="my-booking">
            <h1 className="text-3xl font-semibold mb-4">My Booking</h1>
            <BookingList />
        </div>
    );
}