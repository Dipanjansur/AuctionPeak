import React, { useState } from 'react';
import Baseaxios from "../utils/axiosConstruct";

const BidForm = ({ ItemId, onBidSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid bid amount.');
      return;
    }

    setLoading(true);

    const bidData = {
      amount: parseFloat(amount),
      ItemId: ItemId,
    };

    try {
      // 👈 Use baseAxios.post(). Axios automatically serializes the bidData object.
      // The headers are already configured in the baseAxios instance.
      const response = await Baseaxios.post('/bids/', bidData); 

      const result = response; // Axios response body is in .data
      setMessage(`✅ Bid placed successfully! Amount: $${result.amount.toLocaleString()}`);
      setAmount(''); 

      if (onBidSuccess) {
        onBidSuccess();
      }

    } catch (error) {
      console.error('Bid submission failed:', error);
      // Access the specific error message from the backend response
      const errorMessage = error.response?.data?.message || error.message;
      setMessage(`❌ Failed to place bid: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the component's JSX (remains the same) ...

  return (
    <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '20px' }}>
      <h3>Place a New Bid for Item ID: {ItemId}</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="bidAmount" style={{ display: 'block', marginBottom: '5px' }}>Bid Amount ($)</label>
          <input
            id="bidAmount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            placeholder="e.g., 2133.00"
            required
            style={{ padding: '8px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <button type="submit" disabled={loading} style={{ 
          padding: '10px 15px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: loading ? 'not-allowed' : 'pointer' 
        }}>
          {loading ? 'Submitting Bid...' : 'Submit Bid'}
        </button>
      </form>
      
      {message && (
        <p style={{ marginTop: '10px', color: message.startsWith('❌') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default BidForm;