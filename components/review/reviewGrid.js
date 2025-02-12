import Review from '@/components/review/review';
import ContentSection from "@/components/contentSection/contentSection";

const ReviewGrid = ({ reviews }) => {
    const reviewCount = reviews.length;
    let skipCount = reviewCount % 3;

    let gridClasses = 'grid-cols-3';
    if (skipCount === 2) {
        gridClasses = 'grid-cols-2';
    } else if (skipCount === 1) {
        gridClasses = 'grid-cols-1';
    }

    const mainPart = reviews.slice(0, reviews.length - skipCount);
    const endPart = reviews.slice(reviews.length - skipCount);

    return (
        <ContentSection title="Co mówią o nasi klienci?">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-3 gap-6 justify-center">
                    {mainPart.map((review, index) => (
                        <Review
                            key={index}
                            text={review.text}
                            author={review.author}
                            imageSrc={review.imageSrc}
                            imageAlt={review.imageAlt}
                        />
                    ))}
                </div>
                <div className={`grid ${gridClasses} gap-6 justify-center mt-6`} >
                    {endPart.map((review, index) => (
                        <Review
                            key={index}
                            text={review.text}
                            author={review.author}
                            imageSrc={review.imageSrc}
                            imageAlt={review.imageAlt}
                        />
                    ))}
                </div>
            </div>
        </ContentSection>
    );
};

export default ReviewGrid;
