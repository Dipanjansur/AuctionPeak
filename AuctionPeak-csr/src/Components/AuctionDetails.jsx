import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAuction } from '../Slices/AuctionSlice';
import GridCardsLayout from '../Layout/GridCardsLayout';
import HorizentalCardLayout from '../Layout/HorizentalCardLayout';
import GenericCards from './GenericCards';
import AuctionActionButtons from './ActionButtons/AuctionActionButtons';
const AuctionDetails = () => {
  const auction = useSelector((state) => state.auction.Auction);
  const auctionDetails = auction?.AuctionDetails
  const auctionName = auction?.name
  const auctionItemDetails = auction?.items
  const auctionPermission=auction?.permission;
  console.log("--------auctionPermission------")
  console.log(auction)
  console.log("--------auctionPermission------")
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
  }, [auctionId]);


  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {auctionDetails ? (
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">{auctionName}</h2>
          <p className="mt-4 max-w-md text-gray-500 mb-10">
            {auctionDetails}
          </p>
          <div className='actionButtons'>
            <AuctionActionButtons permissions={auctionPermission} auctionId={auctionId} />
          </div>
          <h4 className="text-l font-bold text-gray-900 sm:text-3xl">Products for this auction</h4>
        </header>) : (<h1>hello</h1>)}
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => { buttonClicked("GridCardsLayout") }}>
        GridLayout
      </button>
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => { buttonClicked("HorizentalCardLayout") }}>
        HorizantalLayout
      </button>
      {layout.HorizentalCardLayout && <GridCardsLayout ><GenericCards type="Items_Horizental" data={auctionItemDetails} /></GridCardsLayout>}
      {layout.GridCardsLayout && <HorizentalCardLayout ><GenericCards type="Items_Vertical" data={auctionItemDetails} /></HorizentalCardLayout>}
    </div>
  )
}

export default AuctionDetails