
import getCurrentUser from '@/app/actions/getCurrentUser';
import getListingById from '@/app/actions/getListingById'
import EmptyState from '@/components/EmptyState';
import React from 'react'
import ListingClient from '../../../components/listings/ListingClient';

interface IParams{
    listingId?:string;
}

const ListingPage =async ({params}:{params:IParams}) => {

    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()

    if(!listing){
        return (
            <EmptyState />
        )
    }
  return (
    <div>
        <ListingClient 
            listing={listing}
            currentUser={currentUser}
        />
    </div>
  )
}

export default ListingPage