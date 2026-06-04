import { render, screen }
from "@testing-library/react";
import { test, expect } from "vitest";

import TaskCard
from "../components/TaskCard";

test("shows task title", () => {

  render(
    <TaskCard
      task={{
        title: "Testing",
        description: "Demo",
        status: "Pending"
      }}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  expect(
    screen.getByText("Testing")
  ).toBeTruthy();

});