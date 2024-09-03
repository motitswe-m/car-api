const express = require("express");
const router = express.Router();

let cars = [];

// Create a car
router.post("/", (req, res) => {
  const car = req.body;
  cars.push(car);
  res.status(201).send(car);
});

// Read all cars
router.get("/", (req, res) => {
  res.send(cars);
});

// Update a car
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const car = req.body;
  const index = cars.findIndex((c) => c.id === id);
  if (index !== -1) {
    cars[index] = car;
    res.send(car);
  } else {
    res.status(404).send({ message: "Car not found" });
  }
});

// Delete a car
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = cars.findIndex((c) => c.id === id);
  if (index !== -1) {
    cars.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Car not found" });
  }
});

module.exports = router;
