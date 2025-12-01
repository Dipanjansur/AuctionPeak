import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import BidForm from './BidForm';
import Baseaxios from "../utils/axiosConstruct"; 

const DEFAULT_PLACEHOLDER_URL = 'https://picsum.photos/400/300';
const ROTATION_INTERVAL_MS = 20000; 

const ItemDetails = () => {
  let { ItemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Image List Setup ---
  const imageList = [
    DEFAULT_PLACEHOLDER_URL, 
    ...(item?.Pics || []) 
  ].filter((url, index, self) => self.indexOf(url) === index); 

  // --- API Fetch Logic ---
  const fetchItemDetails = useCallback(async () => {
    const endpoint = `/items/${ItemId}`;
    setLoading(true); 

    try {
      const response = await Baseaxios.get(endpoint);
      setItem(response); 
      setError(null);
    } catch (e) {
      console.error("Fetching item details failed:", e);
      setError(e.response?.data?.message || e.message); 
    } finally {
      setLoading(false);
    }
  }, [ItemId]);

  useEffect(() => {
    if (ItemId) {
      fetchItemDetails();
    }
  }, [ItemId, fetchItemDetails]);

  // --- Image Rotation Effect ---
  useEffect(() => {
    if (imageList.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          (prevIndex + 1) % imageList.length
        );
      }, ROTATION_INTERVAL_MS);
      return () => clearInterval(interval);
    }
  }, [imageList.length]); 

  const handleBidSuccess = () => {
    fetchItemDetails(); 
  };
    
  // --- Conditional Rendering ---
  if (loading) return <div className="flex justify-center items-center h-screen"><p>Loading item details...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-600">Error: {error}</p></div>;
  if (!item) return <div className="flex justify-center items-center h-screen"><p>No item details found for ID: {ItemId}</p></div>;

  const currentImageUrl = imageList[currentImageIndex];
  const bids = item.bids || []; // Ensure bids is an array

  // --- Components for Grid ---

  // 1. Image and Item Details Block (ROW 1)
  const ItemInfoBlock = () => (
    <div className="
      flex flex-col items-center 
      bg-white p-6 border border-gray-200 rounded-lg shadow-md 
      md:flex-row md:max-w-full w-full
    ">
        {/* Image Section */}
        <img 
          className="object-cover w-full rounded-lg h-64 md:h-80 md:w-80 mb-4 md:mb-0 md:rounded-l-lg md:rounded-r-none transition-opacity duration-500" 
          src={currentImageUrl}
          alt={item.ItemName}
        />
        
        {/* Details Section */}
        <div className="flex flex-col justify-between md:p-6 leading-normal w-full">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              {item.ItemName}
            </h5>
            <p className="mb-4 text-gray-700">
              {item.ItemDescription}
            </p>

            {item.Bio && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-500">Seller/Item Bio:</p>
                <p className="text-gray-600 italic">{item.Bio}</p>
              </div>
            )}
            
            <div className="mb-6">
                <p className="text-lg text-gray-800">
                    <strong>Status:</strong> <span className="font-semibold text-blue-600">{item.Status}</span>
                </p>
                <p className="text-2xl font-extrabold text-green-700 mt-1">
                    Current Price: ${item.CurrentPrice ? item.CurrentPrice.toLocaleString() : 'N/A'}
                </p>
            </div>
        </div>
    </div>
  );

  // 2. Bids Table (ROW 2)
  const BidsTable = () => (
    <div className="mt-8 bg-white p-6 border border-gray-200 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Bids History ({bids.length})</h2>
      {bids.length === 0 ? (
        <p className="text-gray-500">No bids have been placed on this item yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Placed
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bidder ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Sort by amount descending to show highest bid first */}
              {[...bids].sort((a, b) => b.amount - a.amount).map((bid, index) => (
                <tr key={bid.BidsId || index} className={index === 0 ? 'bg-yellow-50 font-semibold' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${bid.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(bid.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                    {bid.userId || 'Anonymous'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // 3. Create Bid Form (ROW 3)
  const BidFormBlock = () => (
    <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md w-full">
      <BidForm 
          ItemId={item.ItemId} 
          onBidSuccess={handleBidSuccess}
      />
    </div>
  );

  // --- Grid Layout Rendering ---
  return (
    <div className="flex justify-center p-6"> 
      {/* Set the main container as a grid with a maximum width */}
      <div className="grid grid-cols-1 md:max-w-4xl w-full gap-y-6">
        
        {/* ROW 1: Item Image and Details */}
        <div className="col-span-1">
          <ItemInfoBlock />
        </div>
        
        {/* ROW 2: Bids Table */}
        <div className="col-span-1">
          <BidsTable />
        </div>
        
        {/* ROW 3: Bid Form */}
        <div className="col-span-1">
          <BidFormBlock />
        </div>
        
      </div>
    </div>
  );
};

export default ItemDetails;