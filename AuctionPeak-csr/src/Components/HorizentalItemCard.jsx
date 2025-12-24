import { useNavigate } from "react-router-dom"
import { fetchItems } from "../Slices/ItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ImageCarousel from "./ImageCarousel";

const HorizentalItemCard = ({ itemsData }) => {
  const items = itemsData ? itemsData : useSelector((state) => state.item.Items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems());
    console.log("Items in HorizentalItemCard:", items);
  }, [dispatch]);

  if (!items || items.length === 0) {
    return <div>No auctions available</div>;
  }
  return (<ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" >
    {
      items.items?.map((item) => {
        return (
          <li key={item.ItemId} onClick={() => { navigate(`/items/${item.ItemId}`) }}>
            <ImageCarousel
              images={item?.ItemPic ? [item.ItemPic] : ["https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"]}
              altText={item.ItemName}
              heightClass="h-[350px] w-full sm:h-[450px]"
            />
            <div className="relative bg-white pt-3">
              <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                {item.ItemName}
              </h3>
              <p className="mt-2">
                <span className="sr-only">{item.ItemDescription}</span>
                <span className="tracking-wider text-gray-900">{`£ ${item.CurrentPrice} GBP`}</span>
              </p>
            </div>
          </li>
        )
      }
      )
    }
  </ul >)
};

export default HorizentalItemCard