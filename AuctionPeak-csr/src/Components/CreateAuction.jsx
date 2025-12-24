import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Baseaxios from '../utils/axiosConstruct';
import { toast } from 'react-toastify';

const CreateOrUpdateAuction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        AuctionDetails: '',
        auctionPic: [],
        currentImage: '',
        startTime: '',
        duration: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchAuction = async () => {
                try {
                    const response = await Baseaxios.get(`auctions/${id}`);
                    const auction = response.data;
                    // Format dates to datetime-local format (YYYY-MM-DDTHH:mm)
                    const formatDate = (dateString) => {
                        if (!dateString) return '';
                        return new Date(dateString).toISOString().slice(0, 16);
                    };

                    setFormData({
                        name: auction.name || '',
                        AuctionDetails: auction.AuctionDetails || '',
                        auctionPic: auction.auctionPic || [],
                        startTime: formatDate(auction.startTime),
                        duration: auction.duration || 10
                    });
                } catch (error) {
                    console.error("Error fetching auction details", error);
                    toast.error("Failed to load auction details");
                }
            };
            fetchAuction();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const appendImage = (e) => {
        setFormData(prev => ({ ...prev, auctionPic: [...prev.auctionPic, prev.currentImage] }));
    }


    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await Baseaxios.put(`auctions/${id}`, formData);
                toast.success("Auction updated successfully");
            } else {
                await Baseaxios.post('auctions', formData);
                toast.success("Auction created successfully");
            }
            navigate('/'); // Navigate back to list or details
        } catch (error) {
            console.error("Error saving auction", error);
            toast.error(isEditMode ? "Failed to update auction" : "Failed to create auction");
        }
    };

    return (
        <div className="flex justify-center items-center minimun-h-screen bg-gray-50 py-12">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-10 shadow-lg ">
                <legend className="fieldset-legend text-lg font-bold">
                    {isEditMode ? 'Update Auction' : 'Create New Auction'}
                </legend>

                <label className="label">Auction Title</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="Ex: Vintage Camera"
                />

                <label className="label">Description</label>
                <textarea
                    name="AuctionDetails"
                    value={formData.AuctionDetails}
                    onChange={handleChange}
                    className="textarea w-full"
                    placeholder="Detailed description of the item"
                    rows="3"
                ></textarea>
                <div>
                    {formData.auctionPic.map((pic, index) => (
                        <div key={index}>
                            <img src={pic} alt={`pic-${index}`} />
                            <button onClick={() => setFormData({ ...formData, auctionPic: auctionPic.filter((_, i) => i !== index) })}>remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="label">Image URL</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="currentImage"
                            value={formData.currentImage}
                            onChange={handleChange}
                            className="input w-full"
                            placeholder="https://example.com/image.jpg"
                        />
                        {/* 
                            Placeholder for image submit/preview logic if needed separately. 
                            For now, just binding it to state.
                        */}
                    </div>
                    <button onClick={appendImage}>Submit</button>
                </div>

                <label className="label">Start Time</label>
                <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="input w-full"
                />

                <label className="label">Duration</label>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input w-full"
                />

                <div className="mt-4 flex justify-end">
                    <button onClick={handleSubmit} className="btn btn-primary">
                        {isEditMode ? 'Update Auction' : 'Create Auction'}
                    </button>
                </div>
            </fieldset >
        </div >
    )
}
export default CreateOrUpdateAuction