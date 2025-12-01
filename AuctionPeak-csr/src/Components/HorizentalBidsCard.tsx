import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
// Assuming the path and action are correct
import { fetchBids } from '../Slices/BidsSlice'; 

/**
 * Renders a single Bid Card in a grid style.
 * @param {object} props
 * @param {object} props.item - The bid object.
 */
const BidCard = ({ item }) => {
    const navigate = useNavigate();

    // Helper to format the currency
    const formattedAmount = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(item.amount);

    // Data mapping for the card layout (using bid properties)
    const bidTitle = `Highest Bid: ${formattedAmount}`;
    const bidDetails = `On Item ID: ${item.itemId.substring(0, 10)}... | User: ${item.userId.substring(0, 8)}...`;
    const auctionRoute = `/auctions/${item.auctionId}`; 

    // Placeholder/Mock values for image and status since bid object lacks them
    const bidPic = 'https://via.placeholder.com/400x200?text=Your+Bid+💰';
    // For a bid, the "status" is usually about the auction it belongs to.
    const isCurrentHighBidder = true; // Mock status
    const buttonText = isCurrentHighBidder ? 'View Auction' : 'Rebid Now';
    const buttonClass = isCurrentHighBidder ? 'btn btn-primary' : 'btn btn-secondary';


    return (
        <li className="card card-compact w-80 bg-base-100 shadow-xl mx-2 my-4 transform transition duration-300 hover:scale-[1.03] cursor-pointer" 
            onClick={() => { navigate(auctionRoute) }}>
            
            {/* Image Section */}
            <figure className="relative h-48">
                {/* Placeholder for visual representation of the bid/item */}
                <img className="object-cover w-full h-full" src={bidPic} alt={`Bid ${item.BidsId}`} />
                {/* Displaying the bid amount prominently */}
                <div className="absolute top-3 right-3">
                    <div className="badge badge-lg badge-info text-white font-bold">
                        {formattedAmount}
                    </div>
                </div>
            </figure>

            {/* Body Section */}
            <div className="card-body">
                <h2 className="card-title text-xl font-bold p-0">{bidTitle}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{bidDetails}</p>
                
                <div className="card-actions justify-end mt-3">
                    {/* Action Button */}
                    <button className={buttonClass}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </li >
    );
}

BidCard.propTypes = {
    item: PropTypes.shape({
        BidsId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired,
        itemId: PropTypes.string.isRequired,
        auctionId: PropTypes.string.isRequired,
    }).isRequired
}

// ------------------------------------------------------------------

/**
 * Main component to fetch and render the list of BidCards in a grid.
 * Renamed to GridBidsCard.
 */
const GridBidsCard = () => {
    // Redux state and dispatch logic for BIDS
    const bidsData = useSelector(state => state.bids.Bids);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBids());
    }, [dispatch]);
    
    if (!bidsData || bidsData.length === 0) {
        return <div className="p-10 text-center text-gray-600">No bids found for you.</div>;
    }
    
    return (
        // Using a Tailwind Grid structure for the list
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center" role="list">
            {bidsData.map((item) =>
                <BidCard key={item.BidsId} item={item} />
            )}
        </ul>
    );
}

export default GridBidsCard;