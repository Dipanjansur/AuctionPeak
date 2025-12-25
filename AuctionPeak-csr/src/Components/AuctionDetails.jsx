import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchAuction } from '../Slices/AuctionSlice';
import GridCardsLayout from '../Layout/GridCardsLayout';
import HorizentalCardLayout from '../Layout/HorizentalCardLayout';
import GenericCards from './GenericCards';
import AuctionActionButtons from './ActionButtons/AuctionActionButtons';
import ImageCarousel from './ImageCarousel';
const AuctionDetails = () => {
  const auction = useSelector((state) => state.auction.Auction);
  const auctionDetails = auction?.AuctionDetails || "No details available"
  const auctionName = auction?.name
  const auctionItemDetails = auction?.items || []
  const auctionPermission = auction?.permission || [];
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


  const getBgColor = (active) => {
    switch (active) {
      case 0:
        return 'bg-gradient-to-br from-green-50 to-emerald-100';
      case 1:
        return 'bg-gradient-to-br from-slate-50 to-gray-100';
      case -1:
        return 'bg-gradient-to-br from-red-50 to-rose-100';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ${getBgColor(auction?.active)} rounded-xl shadow-sm transition-colors duration-300`}>
      <ImageCarousel
        images={auction?.auctionPic || []}
        altText={auctionName}
        heightClass="h-[350px] w-full sm:h-[450px]"
      />
      {auctionDetails ? (
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">{auctionName}</h2>
          <p className="mt-4 max-w-md text-gray-500 mb-10">
            {auctionDetails}
          </p>

          {auction?.activeTime && (
            <div className="mb-6">
              <span className={`px-4 py-2 text-sm font-medium ${auction.active == 0
                ? 'bg-green-100 text-green-800'
                : auction.active == 1
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
                } rounded-full`}>
                {auction.activeTime}
              </span>
            </div>
          )}

          <div className='actionButtons'>
            <AuctionActionButtons permissions={auctionPermission} auctionId={auctionId} />
          </div>
          <h4 className="text-l font-bold text-gray-900 sm:text-3xl">Products for this auction</h4>
        </header>) : (<h1>hello</h1>)}
      {auctionItemDetails?.length > 0 ? (
        <>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => { buttonClicked("GridCardsLayout") }}>
            GridLayout
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => { buttonClicked("HorizentalCardLayout") }}>
            HorizantalLayout
          </button>
          {layout.HorizentalCardLayout && <GridCardsLayout ><GenericCards type="Items_Horizental" itemsData={auctionItemDetails} /></GridCardsLayout>}
          {layout.GridCardsLayout && <HorizentalCardLayout ><GenericCards type="Items_Vertical" itemsData={auctionItemDetails} /></HorizentalCardLayout>}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <h1 className="text-xl font-bold text-gray-600 mt-4">No Items present</h1>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => { buttonClicked("GridCardsLayout") }}>Add Items</button>
        </div>
      )}
    </div>
  )
}

export default AuctionDetails