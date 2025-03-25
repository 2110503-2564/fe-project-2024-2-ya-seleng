import getVenue from "@/libs/getVenue"
import Image from "next/image"
import { VenueJson, VenueItem } from "../../../../../interfaces";
import Link from "next/link.js";

export default async function VenueDetailPage({params}: {params: {vid: string}}) {

    const venueJson = await getVenue(params.vid)
    const venueDetail = venueJson.data
    console.log(venueDetail)
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001" , {name: "The Bloom Pavilion", image: "/img/bloom.jpg"})
    // mockVenueRepo.set("002" , {name: "Spark Space", image: "/img/sparkspace.jpg"})
    // mockVenueRepo.set("003" , {name: "The Grand Table", image: "/img/grandtable.jpg"})

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{venueDetail.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={venueDetail.picture}
                alt="Veneu Picture"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%] bg-black"/>
                <div className="tex-md mx-5 text-left">Name : {venueDetail.name}
                    <div>Address : {venueDetail.address}</div>
                    <div>District : {venueDetail.district}</div>
                    <div>Province : {venueDetail.province}</div>
                    <div>Postal Code : {venueDetail.postalcode}</div>
                    <div>Tel. : {venueDetail.tel}</div>
                    <div>Daily Rate : {venueDetail.dailyrate}</div>
                </div>
            </div>
        </main>
    )
}