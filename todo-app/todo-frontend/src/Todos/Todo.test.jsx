import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";
import { expect, test, vi } from "vitest";

describe("<Todo />", () => {
  const todo = {
    _id: "123",
    done: false,
    text: "Testo testone",
  };

  const mockComplete = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    mockComplete.mockClear();
    mockDelete.mockClear();
  });

  test("renders text, at start todo is not done", () => {
    render(
      <Todo
        todo={todo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />,
    );

    // Using the ID you added or just the text
    const todoText = screen.getByText("This todo is not done");
    expect(todoText).toBeDefined();

    const taskContent = screen.getByText("Testo testone");
    expect(taskContent).toBeDefined();
  });

  test("renders 'This todo is done' when the todo is completed", () => {
    const completedTodo = { ...todo, done: true };

    render(
      <Todo
        todo={completedTodo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />,
    );

    const doneText = screen.getByText("This todo is done");
    expect(doneText).toBeDefined();
  });

  test("clicking the 'Set as done' button calls the handler", async () => {
    const user = userEvent.setup();

    render(
      <Todo
        todo={todo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />,
    );

    const button = screen.getByText("Set as done");
    await user.click(button);

    // Since onClickComplete is a higher-order function in List.jsx,
    // we verify it was called with the correct todo
    expect(mockComplete).toHaveBeenCalledTimes(1);
    expect(mockComplete).toHaveBeenCalledWith(todo);
  });
});
