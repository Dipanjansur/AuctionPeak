import { useState, useEffect } from 'react';

const ImageCarousel = ({
    images = [],
    altText = 'Image',
    heightClass = 'h-64',
    backgroundColor = 'bg-gray-400 hover:bg-gray-600',
    textSettings = '',
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false)

    // Normalize images input
    const validImages = Array.isArray(images)
        ? images
        : (images ? [images] : []);

    useEffect(() => {
        let interval;
        if (validImages.length > 1 && !isHovered) {
            interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [validImages.length, isHovered]);

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + validImages.length) % validImages.length);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length);
    };

    if (validImages.length === 0) {
        // Fallback if no images are provided
        return (
            <figure className={`relative ${heightClass} bg-gray-200 flex items-center justify-center p-4 overflow-hidden`}>
                <span className="text-gray-400">No Image</span>
            </figure>
        )
    }

    return (
        <figure
            className={`relative ${heightClass} ${backgroundColor} ${textSettings} flex items-center justify-center p-4 overflow-hidden`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {validImages.length > 1 && (
                <button
                    className='p-2 z-10 bg-black hover:bg-gray-800 text-white rounded-full absolute left-2 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity'
                    onClick={handlePrev}
                >
                    &lt;
                </button>
            )}

            <img
                src={validImages[currentImageIndex]}
                alt={altText}
                className="w-full h-full object-contain drop-shadow transition-transform duration-500 ease-out hover:scale-105"
            />

            {validImages.length > 1 && (
                <button
                    className='p-2 z-10 bg-black hover:bg-gray-800 text-white rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity'
                    onClick={handleNext}
                >
                    &gt;
                </button>
            )}
        </figure>
    );
};

export default ImageCarousel;
