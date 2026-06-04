import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

test("renders login heading", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  expect(
  screen.getByRole("heading", {
    name: /login/i,
  })
).toBeTruthy();

});