describe("Task Object", () => {

  test("Task title should exist", () => {

    const task = {
      title: "Frontend",
      description: "Build login page"
    };

    expect(task.title).toBeDefined();

  });

});