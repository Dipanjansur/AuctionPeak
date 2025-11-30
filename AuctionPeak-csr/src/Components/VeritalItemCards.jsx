import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchItems } from "../Slices/ItemsSlice";
import { useEffect } from "react";

const VeritalItemCards = () => {
  const items = useSelector((state) => state.item.Items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchItems());
    console.log("Items in VeritalItemCards:", items);
  }, [dispatch]);

  return (
    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items?.map((item) => {
        // 3. Use the 'navigate' function defined outside the map
        return (
          <li
            key={item.ItemId}
            // Use an inline function to call navigate when the item is clicked
            onClick={() => {
              navigate(`/items/${item.ItemId}`);
            }}
            // Add a group class for the hover effect you defined inside the component
            className="group cursor-pointer" 
          >
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt={item.ItemName}
              className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
            />

            <div className="relative bg-white pt-3">
              <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                {item.ItemName}
              </h3>

              <p className="mt-2">
                <span className="sr-only"> {item.ItemDescription} </span>

                <span className="tracking-wider text-gray-900"> {`£ ${item.CurrentPrice}GBP`} </span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default VeritalItemCards;