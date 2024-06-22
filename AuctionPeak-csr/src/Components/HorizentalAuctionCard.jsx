import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAuctions } from '../Slices/AuctionSlice'

const HorizentalAuctionCard = () => {
  const auctions = useSelector(state => state.auction)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAuctions())
  }, [])
  return (
    <>
      <p>{console.log(auctions)}</p>
    </>
    // <li className="flex justify-between gap-x-6 py-5">
    //   < div className="flex min-w-0 gap-x-4" >
    //     <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
    //     <div className="min-w-0 flex-auto">
    //       <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
    //       <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
    //     </div>
    //   </ >
    //   <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
    //     <p className="text-sm leading-6 text-gray-900">{person.role}</p>
    //     {person.lastSeen ? (
    //       <p className="mt-1 text-xs leading-5 text-gray-500">
    //         Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
    //       </p>
    //     ) : (
    //       <div className="mt-1 flex items-center gap-x-1.5">
    //         <div className="flex-none rounded-full bg-emerald-500/20 p-1">
    //           <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
    //         </div>
    //         <p className="text-xs leading-5 text-gray-500">Online</p>
    //       </div>
    //     )}
    //   </div>
    //</li>
  )
}

export default HorizentalAuctionCard
