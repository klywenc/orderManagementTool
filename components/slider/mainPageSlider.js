import Slider from '@/components/slider/slider';

const MainSlider = () => {
    const imagePaths = [
        '/images/mainSlider/img1.png',
        '/images/mainSlider/img2.png',
        '/images/mainSlider/img3.png',
        '/images/mainSlider/img4.png',
    ];

    return (
        <div className="my-8">
            <Slider imagePaths={imagePaths} />
        </div>
    );
};

export default MainSlider;
