import { useNavigate } from "react-router-dom"
import { fetchItems } from "../Slices/ItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ImageCarousel from "./ImageCarousel";

const HorizentalItemCard = ({ itemsData }) => {
  const reduxItems = useSelector((state) => state.item.Items);
  const items = itemsData ? itemsData : reduxItems;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  /* 
   * Helper to ensure items is properly accessed.
   * Checks if 'items' object has an 'items' array (pagination structure).
   */

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500">
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="flex flex-col gap-6" role="list">
        {items.map((item) => (
          <ItemCard key={item.ItemId} item={item} navigate={navigate} />
        ))}
      </ul>
    </div>
  );
};

const UserActionButton = ({ text, color, action }) => {
  return (
    <button
      className={`${color} hover:bg-black text-white text-sm font-semibold py-2 px-4 mx-1 rounded-lg shadow-sm hover:shadow-md transition-all duration-200`}
      onClick={action}
    >
      {text}
    </button>
  )
}

const ItemCard = ({ item, navigate }) => {

  const activityColor = (active) => {
    if (item.active || item.Status === 'LISTED') return 'bg-gradient-to-tl from-green-300 to-green-500 text-white rounded-xl';
    return 'bg-gradient-to-tl from-slate-300 to-slate-500 text-white rounded-xl';
  }

  const handleDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/items/${item.ItemId}`);
  }

  return (
    <li
      className="group bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col sm:flex-row border-l-4 border-l-indigo-500"
      onClick={handleDetailsClick}
    >
      {/* Image Section - Left Side */}
      <div className="w-full sm:w-1/3 md:w-1/4 h-[250px] sm:h-auto relative">
        <ImageCarousel
          images={item.Pics}
          altText={item.ItemName}
        />
        <div className="absolute top-3 left-3 z-10 sm:hidden">
          <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full shadow-sm text-white ${item.active ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-400'}`}>
            {item.Status || (item.active ? 'Active' : 'Inactive')}
          </span>
        </div>
      </div>

      {/* Content Section - Right Side */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-900 truncate leading-tight group-hover:text-indigo-600 transition-colors">
              {item.ItemName}
            </h2>
            <span className="text-xl font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg shrink-0 ml-2">
              £ {item.CurrentPrice ? item.CurrentPrice.toLocaleString() : '0'}
            </span>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {item.ItemDescription || "No description available."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mt-auto">
          <div className={`${activityColor(item.active)} + flex items-center gap-2 text-sm text-gray-500 font-medium p-2 rounded-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className=" px-3 py-1 text-xs shadow-sm">
              {item.activeTime || (item.Status ? `Status: ${item.Status}` : "Time info unavailable")}
            </span>
          </div>
          {console.log(item.permission)}
          <div className="flex justify-end flex-wrap gap-2">
            <UserActionButton text="View Details" color="bg-gray-800" action={handleDetailsClick} />
          </div>
        </div>
      </div>
    </li >
  )
}

export default HorizentalItemCard;