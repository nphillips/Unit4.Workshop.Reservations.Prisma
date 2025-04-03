const express = require("express");
const app = express();
const PORT = 3000;

const prisma = require("./prisma");

app.use(express.json());
app.use(require("morgan")("dev"));

// GET /api/customers
// fetchCustomers
app.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (err) {
    next();
  }
});

// GET /api/restaurants
// fetchRestaurants
app.get("/api/restaurants", async (req, res, next) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (err) {
    next();
  }
});

// GET /api/reservations
// fetchReservations
app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (err) {
    next();
  }
});

// fetchCustomer
app.get("/api/customers/:id", async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });
    res.json(customer);
  } catch (err) {
    next();
  }
});

// fetchRestaurant
app.get("/api/restaurants/:id", async (req, res, next) => {
  try {
    const restaurantId = +req.params.id;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });
    res.json(restaurant);
  } catch (err) {
    next();
  }
});

// fetchReservation
app.get("/api/reservations/:id", async (req, res, next) => {
  try {
    const reservationId = +req.params.id;
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });
    res.json(reservation);
  } catch (err) {
    next();
  }
});

// POST /api/reservations
// createReservation
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    const { restaurantId, reservationDate } = req.body;
    const reservation = await prisma.reservation.create({
      data: {
        customerId,
        restaurantId,
        reservationDate,
      },
    });
    res.status(201).json(reservation);
  } catch (err) {
    next();
  }
});

// DELETE /api/reservations/:id
// destroyReservation
app.delete("/api/reservations/:id", async (req, res, next) => {
  try {
    const reservationId = +req.params.id;
    await prisma.reservation.delete({ where: { id: reservationId } });
    res.status(204).json({ message: "Reservation deleted" });
  } catch (err) {
    next();
  }
});

// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? 500;
  const message = err.message ?? "Internal server error.";
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
