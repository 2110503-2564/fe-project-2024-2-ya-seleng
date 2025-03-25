import getHotels from "@/libs/getHotels";
import VenueCatalog from "@/components/VenueCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Hotel () {
    const venues = getHotels()
    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Hotel</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <VenueCatalog venuesJson={venues}/>
            </Suspense>
        </main>
    );
}