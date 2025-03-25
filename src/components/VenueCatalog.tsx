import Card from "./Card"
import Link from "next/link"
import { VenueJson, VenueItem } from "../../interface"

export default async function VenueCatalog({venuesJson}:{venuesJson:Promise<VenueJson>}) {
    const venuesJsonReady = await venuesJson
    return (
        <>
        Explore {venuesJsonReady.count} hotels in our catalog
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                {
                    venuesJsonReady.data.map((venueItem:VenueItem)=>(
                        <Link href={`/hotels/${venueItem.id}`} className="w-1/5">
                            <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
                        </Link>
                    ))
                }
        </div>
        </>
    )
}