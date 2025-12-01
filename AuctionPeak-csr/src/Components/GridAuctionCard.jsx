import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAuctions } from '../Slices/AuctionSlice'
import { useNavigate } from 'react-router-dom'

const GridAuctionCard = () => {
  const auctions = useSelector(state => state.auction.Auctions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuctions())
  }, [dispatch])
  if (!auctions || auctions.length === 0) {
    return <div>No auctions available</div>;
  }
  return (
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center" role="list">
    {auctions.map((item) =>
    <AuctionCard key={item.AuctionId} item={item} />
  )}
  </ul>
  )
}
const AuctionCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <li className="card card-compact w-96 bg-base-100 shadow-xl mx-2 my-4" onClick={() => { navigate(`/auctions/${item.AuctionId}`) }}>
      <figure><img src={item?.auctionPic} alt={item?.name} /></figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold p-4 mx-2">{item?.name}</h2>
        <p>{item?.AuctionDetails}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </li >
  )
}
export default GridAuctionCard