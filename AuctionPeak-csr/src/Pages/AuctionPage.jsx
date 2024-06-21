import { useState } from "react"
import GridCardsLayout from "../Layout/GridCardsLayout";
import HorizentalCardLayout from "../Layout/HorizentalCardLayout";
import HorizentalAuctionCard from "../Components/HorizentalAuctionCard";
import GridAuctionCard from "../Components/GridAuctionCard";
import BasicFullScreenLayout from "../Layout/BasicFullScreenLayout";

const AuctionPage = () => {
  const [layout, setlayout] = useState({ "GridCardsLayout": false, "HorizentalCardLayout": true })
  function buttonClicked(keyval) {
    if (keyval == "GridCardsLayout") {
      setlayout({ "GridCardsLayout": true, "HorizentalCardLayout": false })
    } else {
      setlayout({ "GridCardsLayout": false, "HorizentalCardLayout": true })
    }
  }
  return (
    <BasicFullScreenLayout >
      <div className="inline-flex">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => { buttonClicked("GridCardsLayout") }}>
          GridLayout
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => { buttonClicked("HorizentalCardLayout") }}>
          HorizantalLayout
        </button>
      </div>
      {layout.GridCardsLayout && <GridCardsLayout ><GridAuctionCard /></GridCardsLayout>}
      {layout.HorizentalCardLayout && <HorizentalCardLayout ><HorizentalAuctionCard /></HorizentalCardLayout>}
    </BasicFullScreenLayout >
  );
}

export default AuctionPage