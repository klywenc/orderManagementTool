const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const menuItems = [
  { id: 1, name: 'Ramen Tonkotsu', description: 'Klasyczny ramen z bogatym bulionem wieprzowym.', price: 25.00 },
  { id: 2, name: 'Ramen Shoyu', description: 'Ramen z bulionem na bazie sosu sojowego.', price: 22.50 },
  { id: 3, name: 'Ramen Miso', description: 'Ramen z pastą miso.', price: 24.00 },
  { id: 4, name: 'Spicy Ramen', description: 'Ostry ramen dla miłośników pikantnych smaków.', price: 26.50 },
  { id: 5, name: 'Vegetarian Ramen', description: 'Ramen wegetariański z warzywami i tofu.', price: 23.00 },
  { id: 6, name: 'Gyoza', description: 'Japońskie pierożki z mięsem i warzywami.', price: 18.00 },
  { id: 7, name: 'Edamame', description: 'Młode strąki soi gotowane na parze.', price: 12.00 },
  { id: 8, name: 'Kimchi', description: 'Koreańska kiszona kapusta.', price: 10.00 },
  { id: 9, name: 'Wakame Salad', description: 'Sałatka z wodorostów wakame.', price: 15.00 },
];

async function main() {
  await prisma.menuItem.deleteMany({});

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item,
    });
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });