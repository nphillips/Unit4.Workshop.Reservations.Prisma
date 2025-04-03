const prisma = require("../prisma");
const seed = async () => {
  // TODO: Create Customers, Restaurants and Reservations
  const createCustomers = async () => {
    const customers = [
      { name: "John" },
      { name: "Jacob" },
      { name: "Jingleheimer" },
      { name: "Schmidt" },
    ];
    await prisma.customer.createMany({ data: customers });
  };
  const createRestaurants = async () => {
    const restaurants = [
      { name: "Chez Rick's" },
      { name: "McDonalds" },
      { name: "Senior Swanky's" },
    ];
    await prisma.restaurant.createMany({ data: restaurants });
  };
  const createReservations = async () => {
    const reservations = [
      {
        customerId: 1,
        restaurantId: 1,
        reservationDate: new Date("2024-07-01"),
      },
      {
        customerId: 2,
        restaurantId: 2,
        reservationDate: new Date("2024-07-02"),
      },
      {
        customerId: 3,
        restaurantId: 3,
        reservationDate: new Date("2024-07-03"),
      },
      {
        customerId: 4,
        restaurantId: 1,
        reservationDate: new Date("2024-07-04"),
      },
    ];
    await prisma.reservation.createMany({ data: reservations });
  };
  await createCustomers();
  await createRestaurants();
  await createReservations();
};
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
