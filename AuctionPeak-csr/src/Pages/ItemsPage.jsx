import { useEffect, useState } from "react";
import GridCardsLayout from "../Layout/GridCardsLayout";
import HorizentalCardLayout from "../Layout/HorizentalCardLayout";
import GenericCards from "../Components/GenericCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Slices/ItemsSlice";

const ItemsPage = () => {
  const items = useSelector((state) => state.item.Items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])
  const [layout, setlayout] = useState({ "GridCardsLayout": true, "HorizentalCardLayout": false })

  console.log(items)
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
      {layout.GridCardsLayout && <GridCardsLayout ><GenericCards type="Items_Horizental" data={items} /></GridCardsLayout>}
      {layout.HorizentalCardLayout && <HorizentalCardLayout ><GenericCards type="Items_Vertical" data={items} /></HorizentalCardLayout>}
    </>
  );
}

export default ItemsPage