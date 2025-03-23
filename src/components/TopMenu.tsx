import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';

export default async function TopMenu() {
    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <div className="flex justify-between items-center w-full">
                
                <div className="flex items-center">
                    {
                        session ? (
                            <Link href="/api/auth/signout">
                                <div className='px-2 text-cyan-600 text-sm'>
                                    Sign-Out of {session.user?.name}
                                </div>
                            </Link>
                        ) : (
                            <Link href="/api/auth/signin">
                                <div className='px-2 text-cyan-600 text-sm'>
                                    Sign-In
                                </div>
                            </Link>
                        )
                    }
                    <Link href="/mybooking">
                        <div className="px-2 text-cyan-600 text-sm">
                            My Booking
                        </div>
                    </Link>
                </div>
                <TopMenuItem title='Booking' pageRef='/booking'/>
            </div>
            <Image src={'/img/logo.png'} className={styles.logoimg} alt='logo' width={0} height={0} sizes='100vh'/>
        </div>
    );
}