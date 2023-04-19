import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders selectBox", () => {
  render(<App />);
  const header = screen.getByText(/都道府県別/i);
  expect(header).toBeInTheDocument();
  // const linkElement = screen.getByText(/北海道/i);
  // expect(linkElement).toBeInTheDocument();
});
