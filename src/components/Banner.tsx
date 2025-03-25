'use client'
import { use, useState } from "react";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
  const [index, setIndex] = useState(0);
  const { data:session } = useSession()
  console.log(session?.user.token)
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
        <h1 className='text-5xl font-medium'>where every event finds its venue</h1>
        <h3 className='text-2xl font-medium'>Book. Celebrate. Repeat.</h3>
      </div>
      
      {
        session? <div className="z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl">
          Hello {session.user?.name} </div> : null
      }
    </div>
  );
}
