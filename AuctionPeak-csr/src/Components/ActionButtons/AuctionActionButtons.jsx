import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Configuration object for button properties
const buttonConfigurations = {
  'create_auction': {
    title: 'New Auction',
    icon: FaPlus,
    variant: 'success',
    size: 'medium',
    showIcon: true,
    tooltip: 'Create a new auction listing',
    permissions: ['create_auction'],
    confirmDialog: false,
    className: 'bg-green-500 hover:bg-green-600'
  },
  'update_auction': {
    title: 'Edit Auction Details',
    icon: FaEdit,
    variant: 'primary',
    size: 'medium', 
    showIcon: true,
    tooltip: 'Modify existing auction details',
    permissions: ['update_auction'],
    confirmDialog: false,
    className: 'bg-blue-500 hover:bg-blue-600'
  },
  'delete_auction': {
    title: 'Delete Auction',
    icon: FaTrash,
    variant: 'danger',
    size: 'medium',
    showIcon: true,
    tooltip: 'Permanently delete this auction',
    permissions: ['delete_auction'],
    confirmDialog: true,
    confirmMessage: 'Are you sure you want to delete this auction?',
    className: 'bg-red-500 hover:bg-red-600'
  }
};

const AuctionActionButtons = ({ permissions, auctionId }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log("--------permissions in action button------")
  console.log(permissions)
  console.log("--------permissions in action button------")
  const handleBookmarkAuction = async () => {
    try {
      const response = await axios.post(`/api/auctions/${auctionId}/bookmark`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to bookmark auction');
    }
  };

  const handleUpdateAuction = async (auctionId) => {
    try {
      const response = await axios.put(`/api/auctions/${auctionId}`, {
        // Add your auction update data here
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update auction');
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    try {
      const response = await axios.delete(`/api/auctions/${auctionId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete auction');
    }
  };

  const handleAction = async (actionType, auctionId) => {
    try {
      setIsLoading(true);
      if (actionType === 'bookMark') {
        await handleBookmarkAuction();
      } else if (actionType === 'update-auction') {
        await handleUpdateAuction(auctionId);
      } else if (actionType === 'delete-auction') {
        await handleDeleteAuction(auctionId);
      }

      toast.success(`Successfully ${actionType.split('-')[0]}d auction`);
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3">
      {Object.entries(buttonConfigurations).map(([actionType, config]) => {
       console.log("----------------")
       console.log(actionType)
       console.log(permissions)
       console.log("----------------")
        return permissions.includes(actionType) && (
          <button
            key={actionType}
            onClick={() => handleAction(actionType, auctionId)}
            disabled={isLoading}
            className={`
              group relative flex items-center gap-2 px-4 py-2.5
              text-white rounded-lg transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${config.className}
              hover:shadow-lg hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
              ${config.variant === 'danger' ? 'focus:ring-red-500' : 
                config.variant === 'success' ? 'focus:ring-green-500' : 
                'focus:ring-blue-500'}
            `}
            title={config.tooltip}
          >
            {config.showIcon && (
              <config.icon className="w-4 h-4 transition-transform group-hover:scale-110" />
            )}
            <span className="font-medium">{config.title}</span>
            {config.confirmDialog && (
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
  );
};

AuctionActionButtons.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
  auctionId: PropTypes.string.isRequired
};

export default AuctionActionButtons;
