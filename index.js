import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to allow cross-origin requests
app.use(express.static("public")); // Serve static files from the 'public' directory

// Initial car data
let cars = [
  { color: "white", make: "Volkswagen", model: "Polo", reg_number: "CL 61045" },
  { color: "red", make: "Toyota", model: "Tazz", reg_number: "CY 16875" },
  { color: "orange", make: "Nissan", model: "Juke", reg_number: "CK 32655" },
  { color: "orange", make: "Ford", model: "EcoSport", reg_number: "CL 11318" },
  { color: "white", make: "Nissan", model: "Micra", reg_number: "CJ 16103" },
  { color: "orange", make: "Nissan", model: "Juke", reg_number: "CL 42789" },
  { color: "blue", make: "Volkswagen", model: "Jetta", reg_number: "CA 46977" },
  { color: "white", make: "Volkswagen", model: "Polo", reg_number: "CY 25661" },
  { color: "white", make: "Nissan", model: "Micra", reg_number: "CY 35475" },
  { color: "white", make: "Toyota", model: "Corolla", reg_number: "CY 54886" },
  { color: "white", make: "Toyota", model: "Hilux", reg_number: "CJ 16455" },
  { color: "orange", make: "Toyota", model: "Corolla", reg_number: "CK 57166" },
  { color: "orange", make: "Ford", model: "Fiesta", reg_number: "CL 77790" },
  { color: "blue", make: "Nissan", model: "Juke", reg_number: "CY 98904" },
  { color: "white", make: "Ford", model: "Ranger", reg_number: "CF 75599" },
  { color: "red", make: "Toyota", model: "Corolla", reg_number: "CA 5510" },
  { color: "blue", make: "Ford", model: "Focus", reg_number: "CF 75586" },
  { color: "orange", make: "Toyota", model: "Tazz", reg_number: "CA 46137" },
  { color: "orange", make: "Ford", model: "Ranger", reg_number: "CK 22692" },
  { color: "red", make: "Toyota", model: "Corolla", reg_number: "CF 33543" },
  { color: "red", make: "Volkswagen", model: "Touran", reg_number: "CA 94890" },
  { color: "orange", make: "Toyota", model: "Tazz", reg_number: "CY 82252" },
  { color: "blue", make: "Toyota", model: "Yaris", reg_number: "CL 9538" },
  { color: "white", make: "Nissan", model: "Juke", reg_number: "CF 62002" },
  { color: "orange", make: "Ford", model: "Fiesta", reg_number: "CJ 67577" },
  { color: "blue", make: "Ford", model: "Ranger", reg_number: "CA 77852" },
  { color: "orange", make: "Toyota", model: "Hilux", reg_number: "CY 52435" },
  { color: "blue", make: "Toyota", model: "Corolla", reg_number: "CL 76173" },
  { color: "red", make: "Toyota", model: "Tazz", reg_number: "CL 38315" },
  { color: "orange", make: "Toyota", model: "Corolla", reg_number: "CK 41166" },
];

// Create a new car
app.post("/cars", (req, res) => {
  const car = req.body;
  if (!car.color || !car.make || !car.model || !car.reg_number) {
    return res.status(400).send({ error: "All car fields are required" });
  }
  cars.push(car);
  res.status(201).send(car);
});

// Read all cars
app.get("/cars", (req, res) => {
  res.send(cars);
});

// Update an existing car by registration number
app.put("/cars/:reg_number", (req, res) => {
  const reg_number = req.params.reg_number;
  const updatedCar = req.body;
  let carFound = false;
  cars = cars.map((car) => {
    if (car.reg_number === reg_number) {
      carFound = true;
      return { ...car, ...updatedCar };
    }
    return car;
  });
  if (carFound) {
    res.send(updatedCar);
  } else {
    res.status(404).send({ error: "Car not found" });
  }
});

// Delete a car by registration number
app.delete("/cars/:reg_number", (req, res) => {
  const reg_number = req.params.reg_number;
  const initialLength = cars.length;
  cars = cars.filter((car) => car.reg_number !== reg_number);
  if (cars.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).send({ error: "Car not found" });
  }
});

// Get the town with the fewest orange cars
app.get("/cars/fewestOrangeCars", (req, res) => {
  const towns = ["CJ", "CY", "CL", "CK", "CA", "CF"];
  const orangeCarCount = {};

  cars.forEach((car) => {
    if (car.color === "orange") {
      const townCode = car.reg_number.slice(0, 2); // Extract town code from registration number
      if (towns.includes(townCode)) {
        orangeCarCount[townCode] = (orangeCarCount[townCode] || 0) + 1;
      }
    }
  });

  const townWithFewest = Object.keys(orangeCarCount).reduce(
    (a, b) => (orangeCarCount[a] < orangeCarCount[b] ? a : b),
    ""
  );
  res.json({ town: townWithFewest, count: orangeCarCount[townWithFewest] });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
