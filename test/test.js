import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js"; // Ensure correct path and .js extension
import cars from "../data.js"; // Ensure correct path and .js extension

const { expect } = chai;

chai.use(chaiHttp);

describe("Car API", () => {
  // Test for GET /api/cars
  describe("GET /api/cars", () => {
    it("should return all cars", (done) => {
      chai
        .request(app)
        .get("/api/cars")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0); // Assuming there are cars in data
          done();
        });
    });
  });

  // Test for POST /api/cars
  describe("POST /api/cars", () => {
    it("should add a new car", (done) => {
      const newCar = {
        color: "green",
        make: "Honda",
        model: "Civic",
        reg_number: "CL 99999",
      };

      chai
        .request(app)
        .post("/api/cars")
        .send(newCar)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.include(newCar);
          done();
        });
    });
  });

  // Test for DELETE /api/cars/:reg_number
  describe("DELETE /api/cars/:reg_number", () => {
    it("should delete a car by registration number", (done) => {
      const reg_number = "CL 99999"; // The car you want to delete

      chai
        .request(app)
        .delete(`/api/cars/${reg_number}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body[0].reg_number).to.equal(reg_number);
          done();
        });
    });

    it("should return 404 if the car is not found", (done) => {
      const reg_number = "NON_EXISTENT_REG_NUMBER";

      chai
        .request(app)
        .delete(`/api/cars/${reg_number}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.equal("Car not found");
          done();
        });
    });
  });

  // Test for GET /api/cars/most-popular-make
  describe("GET /api/cars/most-popular-make", () => {
    it("should return the most popular car make", (done) => {
      chai
        .request(app)
        .get("/api/cars/most-popular-make")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("mostPopularMake");
          done();
        });
    });
  });
});
