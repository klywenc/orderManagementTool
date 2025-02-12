import MainButtonPanel from "@/components/mainPageButtonPanel/buttonPanel";
import ContentSection from "@/components/contentSection/contentSection";
import MainReviews from "@/components/review/mainPageReviews";
import MainSlider from "@/components/slider/mainPageSlider";

export default function HomePage() {
  return (
      <main className="flex-grow flex items-center justify-center py-8">
          <div className="container mx-auto px-4 text-center">
              <ContentSection title="Witamy w Megumi Ramen!">
                  <p className="text-xl md:text-2xl text-gray-600 mb-10">
                      Najlepszy ramen w mieście, przygotowany ze świeżych składników i z miłością.
                  </p>
              </ContentSection>

              <MainSlider />

              <MainButtonPanel />

              <MainReviews />

              <ContentSection title="Nasza historia">
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                      W Megumi Ramen wszystko zaczęło się od jednej prostej idei – pasji do autentycznej japońskiej kuchni.
                      Zafascynowani jej głębią, smakami i unikalnym podejściem do jedzenia, postanowiliśmy stworzyć
                      miejsce, które będzie połączeniem tradycji z nowoczesnością. Nasza historia to podróż,
                      która zaczęła się w sercu Japonii, by teraz w pełni rozkwitnąć w naszym ramenie,
                      który codziennie serwujemy Wam z miłością.
                  </p>
              </ContentSection>
              <ContentSection imageSrc="/images/restaurant.png" imageAlt="Nasz piękna restauracja w stylu japońskim">
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                      Każdy łyk naszego bulionu to kawałek Japonii. Od samego początku naszym celem było tworzenie dań,
                      które nie tylko będą pyszne, ale i pełne autentyczności. Wybieramy tylko najlepsze składniki –
                      świeże warzywa, mięso najwyższej jakości i ręcznie robione makarony, które są sercem każdej miski ramen.
                      W każdym kęsie, który trafia na Twój stół, kryje się pasja, tradycja i chęć podzielenia się
                      kawałkiem Japonii z Tobą.
                  </p>
              </ContentSection>
              <ContentSection>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                      Ramen to dla nas coś więcej niż tylko danie. To kultura, która łączy ludzi. To zapach, który wypełnia
                      przestrzeń i budzi apetyt na więcej. Nasz zespół nieustannie eksperymentuje, by każda miska była
                      wyjątkowa. Stawiamy na świeżość i perfekcję – gotowanie ramen to dla nas sztuka, w której liczy się
                      każdy szczegół. Wierzymy, że najprostsze składniki w rękach pasjonatów mogą stworzyć prawdziwe .
                  </p>
              </ContentSection>
              <ContentSection imageSrc="/images/ramen.jpg" imageAlt="Nasz pyszny ramen">
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                      W Megumi Ramen nie chodzi tylko o jedzenie – chodzi o doświadczenie. Każda miska, którą podajemy,
                      to
                      nasza pasja, nasza historia i nasza chęć, byś poczuł się wyjątkowo. Dołącz do nas, aby odkryć
                      autentyczny smak Japonii i poczuć się częścią naszej historii.
                  </p>
              </ContentSection>

              <ContentSection title="Godziny otwarcia">
                  <ul className="text-lg text-gray-600">
                      <li>Poniedziałek - Piątek: <strong>12:00 - 22:00</strong></li>
                      <li>Sobota - Niedziela: <strong>13:00 - 23:00</strong></li>
                  </ul>
              </ContentSection>

              <ContentSection title="Znajdź nas">
                  <p className="text-lg text-gray-600">
                      📍 Ul. Główna 24, 82-410 Stary Targ
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                      📞 +48 123 456 789
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                      📧 kontakt@megumiramen.pl
                  </p>
              </ContentSection>

              <MainButtonPanel/>
          </div>
      </main>
  );
}