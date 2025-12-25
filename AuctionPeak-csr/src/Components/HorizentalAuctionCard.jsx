import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAuctions } from '../Slices/AuctionSlice'
import { useNavigate } from 'react-router-dom';
import { propTypes } from 'prop-types'
import ImageCarousel from './ImageCarousel';
const HorizentalAuctionCard = () => {
  const auctions = useSelector((state) => state.auction.Auctions);
  // console.log(auctions)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAuctions());
  }, [dispatch]);

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
          onClick={() => navigate('/auctions/create-auction')}
          className="bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-5 rounded-full transition-all duration-200 shadow-md flex items-center gap-2"
        >
          <span>Create New Auction</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>

      <ul className="flex flex-col gap-6" role="list">
        {auctions.auctions.map((item) =>
          <AuctionCard key={item.AuctionId} item={item} />
        )}
      </ul>
    </div>
  );
};

const UserActionButton = ({ text, color, action }) => {
  return (<button
    className={`${color} hover:bg-black text-white text-sm font-semibold py-2 px-4 mx-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
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

  const joinButtonAction = (e) => { e.stopPropagation(); }
  const leaveButtonAction = (e) => { e.stopPropagation(); }
  const detailsButtonAction = (e) => {
    e.stopPropagation();
    navigate(`/auctions/${item.AuctionId}`);
  }

  return (
    <li
      className="group bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col sm:flex-row border-4 border-indigo-500"
    >
      {/* Image Section - Left Side */}
      {/* Image Section - Left Side */}
      <div className="w-full sm:w-1/3 md:w-1/4 min-h-[200px]">
        <ImageCarousel
          images={item?.auctionPic}
          altText={item?.name}
          heightClass="h-full min-h-[200px]"
        />
      </div>

      {/* Content Section - Right Side */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-900 truncate leading-tight">
              {item?.name}
            </h2>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {item?.AuctionDetails || "This auction item has no detailed description available."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mt-auto">
          <p className={activityColor(item?.active) + " text-center px-4 py-1.5 text-xs font-semibold shadow-sm whitespace-nowrap self-start sm:self-auto"}>
            {item?.activeTime?.slice(0, 40) + (item?.activeTime?.length > 40 ? "..." : "")}
          </p>
          <div className="flex justify-end flex-wrap gap-2">
            {item.permission.includes("join_auction") && !item.permission.includes("leave_auction") && (<UserActionButton text="Participate" color="bg-gray-600" action={joinButtonAction} />)}
            {item.permission.includes("leave_auction") && !item.permission.includes("join_auction") && (<UserActionButton text="Leave" color="bg-gray-600" action={leaveButtonAction} />)}
            {item.permission.includes("leave_auction") && (<UserActionButton text="Details" color="bg-gray-600" action={detailsButtonAction} />)}
          </div>
        </div>
      </div>
    </li >
  )
}

export default HorizentalAuctionCard
