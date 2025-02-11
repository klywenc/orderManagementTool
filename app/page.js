import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">

      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6">
            Witamy w Megumi Ramen!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Najlepszy ramen w mieście, przygotowany ze świeżych składników i z miłością.
          </p>

          <div className="relative w-full max-w-3xl mx-auto mb-10">
            <Image
              src="/images/ramen.jpg" // Poprawiona ścieżka
              alt="Pyszny ramen"
              width={1200}  // Dostosuj do rozmiaru obrazka
              height={600} // Dostosuj do rozmiaru obrazka
              className="rounded-lg shadow-xl object-cover"
              priority // Dodaj, jeśli obrazek jest ważny dla LCP
            />
            <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div> {/* Ciemne tło dla lepszej czytelności */}
          </div>
          

          <Link href="/menu" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transition-colors duration-200 mb-4">
              Zobacz Menu
          </Link>
            <br/>
          <Link href="/login" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full text-lg md:text-xl transition-colors duration-200">
            Zaloguj się
          </Link>
        </div>
      </main>
    </div>
  );
}