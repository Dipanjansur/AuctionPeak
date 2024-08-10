import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAuction, fetchAuctionItems } from '../Slices/AuctionSlice';
import GridCardsLayout from '../Layout/GridCardsLayout';
import HorizentalCardLayout from '../Layout/HorizentalCardLayout';
import GenericCards from './GenericCards';
const AuctionDetails = () => {
  const auction = useSelector((state) => state.auction.Auction.message);
  const auctionItmes = useSelector((state) => state.auction.Auction.Items);
  const [layout, setlayout] = useState({ "GridCardsLayout": true, "HorizentalCardLayout": false })
  function buttonClicked(keyval) {
    if (keyval == "GridCardsLayout") {
      setlayout({ "GridCardsLayout": true, "HorizentalCardLayout": false })
    } else {
      setlayout({ "GridCardsLayout": false, "HorizentalCardLayout": true })
    }
  }
  const dispatch = useDispatch();
  let { auctionId } = useParams();

  useEffect(() => {
    dispatch(fetchAuction(auctionId));
    dispatch(fetchAuctionItems(auctionId));

  }, [dispatch, auctionId]);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header>
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">{auction?.name}</h2>
        <p className="mt-4 max-w-md text-gray-500">
          {auction?.AuctionDetails}
        </p>
        <h4 className="text-xl font-bold text-gray-900 sm:text-3xl">Products for this auction</h4>
      </header>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => { buttonClicked("GridCardsLayout") }}>
        GridLayout
      </button>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => { buttonClicked("HorizentalCardLayout") }}>
        HorizantalLayout
      </button>
      {layout.HorizentalCardLayout && <GridCardsLayout ><GenericCards type="Items_Horizental" data={auctionItmes} /></GridCardsLayout>}
      {layout.GridCardsLayout && <HorizentalCardLayout ><GenericCards type="Items_Vertical" data={auctionItmes} /></HorizentalCardLayout>}
    </div>
  )
}

export default AuctionDetails