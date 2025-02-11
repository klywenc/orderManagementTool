import Link from 'next/link';
import Image from 'next/image';
import MainButtonPanel from "@/components/mainPageButtonPanel/buttonPanel";

export default function HomePage() {
  return (
      <main className="flex-grow flex items-center justify-center py-8">
          <div className="container mx-auto px-4 text-center">
              <section className="relative w-full max-w-3xl mx-auto mb-10">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6">
                      Witamy w Megumi Ramen!
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 mb-10">
                      Najlepszy ramen w mieście, przygotowany ze świeżych składników i z miłością.
                  </p>
                  <Image
                      src="/images/ramen.jpg"
                      alt="Pyszny ramen"
                      width={1200}
                      height={600}
                      className="rounded-lg shadow-xl object-cover"
                      priority
                  />
              </section>

              <MainButtonPanel />

              <section className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                      Co mówią nasi klienci?
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6 justify-center">
                      <blockquote className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
                          <p className="text-gray-600 italic">
                              „Najlepszy ramen, jaki jadłem w Polsce! Świetna obsługa i klimat.”
                          </p>
                          <span className="block font-bold text-gray-800 mt-4">— Michał K.</span>
                      </blockquote>
                      <blockquote className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
                          <p className="text-gray-600 italic">
                              „Mega aromatyczny bulion, autentyczny smak Japonii. Polecam każdemu!”
                          </p>
                          <span className="block font-bold text-gray-800 mt-4">— Karolina W.</span>
                      </blockquote>
                  </div>
              </section>

              <section className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                      Nasza historia
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Megumi Ramen powstało z miłości do autentycznej japońskiej kuchni.
                      Nasz zespół codziennie przygotowuje świeże buliony, ręcznie robione makarony i wyjątkowe dodatki,
                      aby dostarczyć Wam niezapomniane doznania smakowe.
                  </p>
              </section>

              <section className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                      Godziny otwarcia
                  </h2>
                  <ul className="text-lg text-gray-600">
                      <li>Poniedziałek - Piątek: <strong>12:00 - 22:00</strong></li>
                      <li>Sobota - Niedziela: <strong>13:00 - 23:00</strong></li>
                  </ul>
              </section>

              <section className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                      Znajdź nas
                  </h2>
                  <p className="text-lg text-gray-600">
                      📍 Ul. Smakoszy 12, 00-123 Warszawa
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                      📞 +48 123 456 789
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                      📧 kontakt@megumiramen.pl
                  </p>
              </section>

              <MainButtonPanel />
          </div>
      </main>
  );
}