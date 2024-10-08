'use client'

import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { TbPhotoPlus } from 'react-icons/tb'



interface ImageUploadProps {
    onChange: (value: string) => void
    value: string
}

const Imageupload = ({ onChange, value }: ImageUploadProps) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])

    return (
        <CldUploadWidget
            uploadPreset='airbnb-preset'
            onSuccess={handleUpload}
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open()}
                        className='relative cursor-pointer hover:opacity-70 transition border-dashed p-20 border-2 flex flex-col justify-center items-center gap-4 text-neutral-600'
                    >
                        <TbPhotoPlus size={50} />
                        <div className='font-semibold text-lg'>
                            Click to upload
                        </div>
                        {value && (
                            <div className='absolute inset-0 w-full h-full'>
                                <Image
                                    alt='upload'
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
        
    )
}

export default Imageupload