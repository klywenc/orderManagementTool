import ReviewGrid from '@/components/review/reviewGrid';

const reviews = [
    {
        text: '„Najlepszy ramen, jaki jadłem w Polsce! Świetna obsługa i klimat.”',
        author: 'Michał K.',
        imageSrc: '/images/reviews/revimg5.png',
        imageAlt: 'Ramen w restauracji Megumi',
    },
    {
        text: '„Mega aromatyczny bulion, autentyczny smak Japonii. Polecam każdemu!”',
        author: 'Karolina W.',
        imageSrc: '/images/reviews/revimg2.png',
        imageAlt: 'Aromatyczny bulion japoński',
    },
    {
        text: '„Niezwykle smaczne dania i przyjazna atmosfera. Zdecydowanie wrócę!”',
        author: 'Anna S.',
        imageSrc: '/images/reviews/revimg3.png',
        imageAlt: 'Gyoza z woka, danie kuchni japońskiej',
    },
    {
        text: '„Pyszne jedzenie i miła obsługa. Idealne miejsce na kolację z przyjaciółmi.”',
        author: 'Tomasz P.',
        imageSrc: '/images/reviews/revimg4.png',
        imageAlt: 'Sushi podawane w restauracji',
    },
    {
        text: '„Kuchnia na najwyższym poziomie, każdy kęs to przyjemność!”',
        author: 'Paweł M.',
        imageSrc: '/images/reviews/revimg5.png',
        imageAlt: 'Porcja ramen z dodatkami',
    },
];



const MainReviews = () => (
    <div>
        <ReviewGrid reviews={reviews} />
    </div>
);

export default MainReviews;
