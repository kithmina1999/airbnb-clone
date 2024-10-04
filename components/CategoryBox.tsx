'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'
import qs from 'query-string'

interface CategoryBoxProps {
  icon: JSX.Element
  label: string;
  selected?: boolean
}

const CategoryBox = ({
  icon,
  label,
  selected
}: CategoryBoxProps) => {

  const router = useRouter();
  const params = useSearchParams()


  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery:  qs.StringifiableRecord = {
      ...currentQuery,
      category: label
    }
    if (params?.get('category') === label) {
      delete updatedQuery.category
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true })

    router.push(url)
  }, [label, params, router])


  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-2 hover:text-neutral-800 transition cursor-pointer
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}>
      {icon}
      <div className='font-medium text-sm'>
        {label}
      </div>
    </div>
  )
}

export default CategoryBox