import Image from 'next/image';

const Review = ({ text, author, imageSrc, imageAlt }) => (
    <div className="bg-gray-100 text-gray-800 shadow-lg rounded-lg p-6 max-w-sm mx-auto flex flex-col items-center justify-center">
        {imageSrc && (
            <div className="mb-4 w-full h-48 relative border-4 border-gray-200 rounded-xl">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
        )}
        <p className="text-gray-600 italic text-center">{text}</p>
        <span className="block font-bold text-gray-800 mt-4 text-center">— {author}</span>
    </div>
);

export default Review;
