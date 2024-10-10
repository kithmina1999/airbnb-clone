'use client';
import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProp {
    title?: string;
    subtitle?: string;
    showRest?: boolean;
}

const EmptyState = ({
    title = 'No exact matches!',
    subtitle = 'Try changing or removing some of your filters',
    showRest
}: EmptyStateProp) => {
    const router = useRouter()
    return (
        <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            <div className='w-40 mt-4'>
                {showRest && (
                    <Button 
                        outline
                        label='Remove all filters'
                        onClick={()=> router.push('/')}
                    />
                )}
            </div>
        </div>
    )
}

export default EmptyState