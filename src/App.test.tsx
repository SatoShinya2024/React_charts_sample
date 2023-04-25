import { render, screen } from "@testing-library/react";
import App from "./App";
import renderer, { act, create } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import Prefecture from "./Prefecture";
jest.mock("./Prefecture");
jest.mock("./Chart");

test("renders test", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("click checkbox and change selectbox", () => {
  let view = render(<Prefecture />);
  let input = screen.getAllByRole("checkbox");
  act(() => {
    input.forEach((value) => {
      userEvent.click(value);
    });
  });
  expect(view).toMatchSnapshot();

  userEvent.selectOptions(screen.getByRole("combobox"), "YP");

  expect(view).toMatchSnapshot();

  userEvent.selectOptions(screen.getByRole("combobox"), "WP");

  expect(view).toMatchSnapshot();

  userEvent.selectOptions(screen.getByRole("combobox"), "GP");

  expect(view).toMatchSnapshot();
});
