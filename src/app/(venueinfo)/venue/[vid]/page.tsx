import Image from "next/image"
import getVenue from "@/libs/getVenue"
import Link from "next/link"

export default async function VenueDetailPage ({params} : {params:{vid:string}}){
    
    const venueDetail = await getVenue(params.vid)
    /*
        Mock DAta for Demonstration Only
    */
   /*
    const mockVenueRepo = new Map()
    mockVenueRepo.set("001", {name: "The Bloom Pavilion", image: "/img/bloom.jpg"})
    mockVenueRepo.set("002", {name: "Spark Space", image: "/img/sparkspace.jpg"})
    mockVenueRepo.set("003", {name: "The Grand Table", image: "/img/grandtable.jpg"})
    */

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{venueDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src = { venueDetail.data.picture }
                    alt="Venue Image"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">Name: {venueDetail.data.name}</div>
                <div className="text-md mx-5 text-left">Address: {venueDetail.data.address}</div>
                <div className="text-md mx-5 text-left">District: {venueDetail.data.district}</div>
                <div className="text-md mx-5 text-left">Postal Code: {venueDetail.data.postalcode}</div>
                <div className="text-md mx-5 text-left">Tel: {venueDetail.data.tel}</div>
                <div className="text-md mx-5 text-left">Daily Rate: {venueDetail.data.dailyrate}</div>

                <Link href={`/booking?id=${params.vid}&model=${venueDetail.data.model}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm">
                        Booking
                    </button>
                </Link>

            </div>
        </main>
    )
}
/*
export async function generateStaticParams() {
    return [{vid:'001'},{vid:'002'},{vid:'003'}]
}
*/