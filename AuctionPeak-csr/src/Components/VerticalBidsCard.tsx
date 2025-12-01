import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBids } from '../Slices/BidsSlice';

/**
 * Renders a single bid item.
 * @param {object} props
 * @param {object} props.item - The bid object.
 */
const BidCard = ({item}) => {
    const navigate = useNavigate();
  // Helper to format the currency
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(item.amount);

  // Fallback values since the bid data doesn't have 'auctionPic', 'name', or 'AuctionDetails'
  const bidName = `Bid on Item ${item.itemId.substring(0, 8)}`;
  const bidDetails = `User ID: ${item.userId.substring(0, 8)}... | Auction ID: ${item.auctionId.substring(0, 8)}...`;
  const auctionRoute = `/auctions/${item.auctionId}`; // Navigate to the associated auction

  return (
    <li className="flex justify-between gap-x-6 p-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
        onClick={() => { navigate(auctionRoute) }}>
      <div className="flex min-w-0 gap-x-4" >
        {/* Placeholder for the image, as bid data doesn't contain a picture URL */}
        <div className="h-12 w-12 flex-none rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
            💰
        </div>
        <div className="min-w-0 flex-auto">
          {/* Displaying bid name/item ID and details */}
          <p className="text-sm font-semibold leading-6 text-gray-900">{bidName}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{bidDetails}</p>
        </div>
      </div >

      {/* Right side: Displaying the bid amount and status */}
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm font-bold leading-6 text-gray-900">{formattedAmount}</p>
     {/* TODO: work on isLive and lastPlacedBidTime */}
        {/* {isLive ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Current bid <time dateTime={lastSeenTime}>Online</time>
          </p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Auction ended</p>
          </div>
        )} */}
      </div>
    </li >
  )
}

BidCard.propTypes = {
  item: PropTypes.shape({
    BidsId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    auctionId: PropTypes.string.isRequired,
  }).isRequired
};
const VerticalBidsCard = () => {
  const bidsData = useSelector((state) => state.bids.Bids);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBids());
    console.log("Bids in VerticalBidsCard:", bidsData);
  }, [dispatch]);

  if (!bidsData || bidsData.length === 0) {
    return <div className="p-5 text-center text-gray-600">No bids available</div>;
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {bidsData.map((bids) => (
        <BidCard key={bids.BidsId} item={bids} />
      ))}
    </ul>
  );
};

export default VerticalBidsCard;