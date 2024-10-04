'uce client'
import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { Session } from 'next-auth'
import { User } from '@prisma/client'
import Categories from './Categories'


interface NavbarProps {
    session: Session | null | string | { error: string };
    currentUser: User | null | string
}


const Navbar: React.FC<NavbarProps> = ({ session,currentUser }) => {

    return (
        <div className='fixed w-full bg-white z-10 shadow-sm'>
            <div className='py-4 border-b-[1px]'>
                <Container>
                    <div className='flex flow-row items-center justify-between gap-3 md:gap-0'>
                        <Logo />
                        <Search />
                        <UserMenu session={session}  currentUser={currentUser}/>
                    </div>
                </Container>               
            </div>
            <Categories />
        </div>
    )
}

export default Navbar