import useCountries from '@/hooks/useCountry';
import { SafeUser } from '@/types';
import React from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead = ({
    title,
    id,
    imageSrc,
    locationValue,
    currentUser
}: ListingHeadProps) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)
    return (
        <>
            <Heading 
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image src={imageSrc} alt='Image' fill className='object-cover w-full'/>
                <div className='absolute top-5 right-5'>
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser ?? null}
                    />
                </div>
            </div>
        </>
    )
}

export default ListingHead