import http from "k6/http";
import { check } from "k6";

export default function() {
  // Create a new user account
  let createUserResponse = http.post(
    "http://localhost:8080/users",
    { name: "John Doe", email: "johndoe@example.com" }
  );
  check(createUserResponse, {
    "user account created successfully": (r) => r.status === 200
  });

  // Retrieve the user account
  let retrieveUserResponse = http.get(
    "http://localhost:8080/users/johndoe@example.com"
  );
  check(retrieveUserResponse, {
    "user account retrieved successfully": (r) => r.status === 200,
    "user account name is correct": (r) => r.json("name") === "John Doe"
  });
}