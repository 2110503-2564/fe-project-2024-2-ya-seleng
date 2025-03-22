import Card from "./Card"
import Link from "next/link"
export default async function VenueCatalog({venuesJson}:{venuesJson:Promise<VenueJson>}) {
    const venuesJsonReady = await venuesJson
    return (
        <>
        Explore {venuesJsonReady.count} models in our catalog
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                {
                    venuesJsonReady.data.map((venueItem:VenueItem)=>(
                        <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                            <Card venueName={venueItem.name} imgSrc={venueItem.picture}/>
                        </Link>
                    ))
                }
        </div>
        </>
    )
}