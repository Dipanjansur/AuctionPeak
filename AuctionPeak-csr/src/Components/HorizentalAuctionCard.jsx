import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAuctions } from '../Slices/AuctionSlice'
import { useNavigate } from 'react-router-dom';
import { propTypes } from 'prop-types'
const HorizentalAuctionCard = () => {
  const auctions = useSelector((state) => state.auction.Auctions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuctions());
  }, [dispatch]);

  if (!auctions || auctions.length === 0) {
    return <div>No auctions available</div>;
  }
  return <ul>{auctions.map((item) =>
    <AuctionCard key={item.AuctionId} item={item} />
  )}
  </ul>
};

const AuctionCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <li className="flex justify-between gap-x-6 p-5" onClick={() => { navigate(`/auctions/${item.AuctionId}`) }}>
      <div className="flex min-w-0 gap-x-4" >
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={item?.auctionPic} alt={item?.name} />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{item?.name}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item?.AuctionDetails}</p>
        </div>
      </div >
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">role</p>
        {/* TODO: check if endtime is before then say ended at  or if live give e a  live button and mention ending time */}
        {true ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time dateTime={"last name"}>Online</time>
          </p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">ended 2 days before</p>
          </div>
        )}
      </div>
    </li >
  )
}
AuctionCard.propTypes = {

}
export default HorizentalAuctionCard
