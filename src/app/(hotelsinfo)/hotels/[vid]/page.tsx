import getHotel from "@/libs/getHotel"
import Image from "next/image"
import { HotelJson, HotelItem } from "../../../../../interfaces";
import Link from "next/link.js";

export default async function VenueDetailPage({params}: {params: {vid: string}}) {

    const hotelJson = await getHotel(params.vid)
    const hotelDetail = hotelJson.data     
    console.log(hotelDetail)
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001" , {name: "The Bloom Pavilion", image: "/img/bloom.jpg"})
    // mockVenueRepo.set("002" , {name: "Spark Space", image: "/img/sparkspace.jpg"})
    // mockVenueRepo.set("003" , {name: "The Grand Table", image: "/img/grandtable.jpg"})

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{hotelDetail.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={hotelDetail.picture}
                alt="Veneu Picture"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%] bg-black"/>
                <div className="tex-md mx-5 text-left">Name : {hotelDetail.name}
                    <div>Address : {hotelDetail.address}</div>
                    <div>District : {hotelDetail.district}</div>
                    <div>Province : {hotelDetail.province}</div>
                    <div>Postal Code : {hotelDetail.postalcode}</div>
                    <div>Tel. : {hotelDetail.tel}</div>
                    <div>Daily Rate : {hotelDetail.dailyrate}</div>
                </div>
            </div>
        </main>
    )
}