'use client'
import { use, useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
  const [index, setIndex] = useState(0);
  const { data:session } = useSession()
  const router = useRouter()
  return (
    <div className={styles.banner} onClick={()=>setIndex(index+1)}>
      <Image
        src={covers[index%4]}
        alt="cover"
        fill
        style={{ objectFit: "cover" }}
      />

      {/* Need to change to Hotel motto */}
      <div className={styles.bannerText}>
        <h1 className='text-5xl font-medium'>Find Your Perfect Stay</h1>
        <h3 className='text-2xl font-medium'>Book. Relax. Enjoy.</h3>
      </div>
      
      {
        session? <div className="z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl">
          Hello {session.user?.name} </div> : null
      }
      <button className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent'
        onClick={(e)=>{e.stopPropagation(); router.push('/hotels')}}
        >
          Select Venue
        </button>
    </div>
  );
}
