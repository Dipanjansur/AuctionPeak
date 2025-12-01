import {useState } from "react";
import GridCardsLayout from "../Layout/GridCardsLayout";
import HorizentalCardLayout from "../Layout/HorizentalCardLayout";
import GenericCards from "../Components/GenericCards";
const ItemsPage = () => {
  const [layout, setlayout] = useState({ "GridCardsLayout": true, "HorizentalCardLayout": false })
  function buttonClicked(keyval) {
    if (keyval == "GridCardsLayout") {
      setlayout({ "GridCardsLayout": true, "HorizentalCardLayout": false })
    } else {
      setlayout({ "GridCardsLayout": false, "HorizentalCardLayout": true })
    }
  }
  return (
    <>
      <div className="inline-flex">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => { buttonClicked("GridCardsLayout") }}>
          GridLayout
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => { buttonClicked("HorizentalCardLayout") }}>
          HorizantalLayout
        </button>
      </div>
      {layout.GridCardsLayout && <GridCardsLayout ><GenericCards type="Bids_Horizental"/></GridCardsLayout>}
      {layout.HorizentalCardLayout && <HorizentalCardLayout ><GenericCards type="Bids_Vertical"/></HorizentalCardLayout>}
    </>
  );
}

export default ItemsPage