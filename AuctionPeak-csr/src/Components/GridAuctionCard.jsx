import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAuctions } from '../Slices/AuctionSlice'
import { useNavigate } from 'react-router-dom'

import ImageCarousel from './ImageCarousel'

const GridAuctionCard = () => {
  const auctions = useSelector(state => state.auction.Auctions)
  // console.log(auctions)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAuctions())
  }, [dispatch])

  if (!auctions || auctions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p className="text-xl font-medium">No auctions available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate('/auctions/create-auction')} // Updated to use navigate
          className="bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-full transition-all duration-200 shadow-md flex items-center gap-2"
        >
          <span>Create New Auction</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center" role="list">
        {auctions.auctions.map((item) =>
          <AuctionCard key={item.AuctionId} item={item} />
        )}
      </ul>
    </div>
  )
}

const UserActionButton = ({ text, color, action }) => {
  return (<button
    className={`${color} hover:bg-black text-white text-sm font-semibold py-2.5 px-6 mx-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
    onClick={action}
  >
    {text}
  </button>)
}
const AuctionCard = ({ item }) => {
  const navigate = useNavigate();
  const activityColor = (active) =>
    active == 0
      ? 'bg-gradient-to-tl from-green-300 to-green-500 text-white rounded-xl'
      : active == 1
        ? 'bg-gradient-to-tl from-slate-300 to-slate-500 text-white rounded-xl'
        : 'bg-gradient-to-tl from-red-200 to-red-400 text-white rounded-xl'

  // Defined locally to access `item` and `navigate`, and stop propagation
  const joinButtonAction = (e) => { e.stopPropagation(); }
  const leaveButtonAction = (e) => { e.stopPropagation(); }
  const detailsButtonAction = (e) => {
    e.stopPropagation();
    navigate(`/auctions/${item.AuctionId}`);
  }

  return (
    <li
      className="group w-full max-w-[340px] bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col border-4 border-indigo-500"
      // onClick={() => { navigate(`/auctions/${item.AuctionId}`) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section - Lime Background */}
      <ImageCarousel
        images={item?.auctionPic}
        altText={item?.name}
        heightClass="h-64"
      />

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-[1.15rem] font-bold text-gray-900 mb-2 truncate leading-tight">
          {item?.name}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 ">
          {item?.AuctionDetails || "This auction item has no detailed description available."}
        </p>

        <div className=" mt-auto flex justify-end">
          <p className={activityColor(item?.active) + " text-center p-2 m-2"}>{item?.activeTime.slice(0, 40) + "..."}</p>
        </div>
        <div className=" flex justify-end items-center gap-2">
          {item.permission.includes("join_auction") && !item.permission.includes("leave_auction") && (<UserActionButton text="Participate" color="bg-gray-600" action={joinButtonAction} />)}
          {item.permission.includes("leave_auction") && !item.permission.includes("join_auction") && (<UserActionButton text="Leave" color="bg-gray-600" action={leaveButtonAction} />)}
          {item.permission.includes("leave_auction") && (<UserActionButton text="Details" color="bg-gray-600" action={detailsButtonAction} />)}
        </div>
      </div>
    </li >
  )
}
export default GridAuctionCard