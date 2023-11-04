import React from 'react'
import { http } from 'msw'
import Tasks from "./Tasks"
import { fireEvent, render, screen } from '@testing-library/react'
import { setupServer } from 'msw/node'

describe("Tasks Component", () => {

  const worker = setupServer(
    http.get("https://jsonplaceholder.typicode.com/todos?_limit=10", async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            "userId": 1,
            "id": 2,
            "title": "quis ut nam facilis et officia qui",
            "completed": false,
          },
        ])
      );
    })
  );

  beforeAll(() => {
    worker.listen();
  });

  beforeEach(() =>{
    worker.resetHandlers()
  })

  it("shoud fetch and show tasks on button click", async () => {
    render(<Tasks />);

    const button = screen.getByText(/get tasks/i);

    fireEvent.click(button);

    await screen.findByText("quis ut nam facilis et officia qui");
  });

  it("should show error message",  async () => {
    worker.use(
      http.get("https://jsonplaceholder.typicode.com/todos?_limit=10", async (req, res, ctx) => {
      return res(
        ctx.status(500), ctx.json({ message: "error happened" })
      );
    })
    );

    render(<Tasks />);
    const button = screen.getByText(/get tasks/i);

    fireEvent.click(button);

    await screen.findByText("Request failed with status code 500");
  });
  })