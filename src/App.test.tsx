import { render, screen } from "@testing-library/react";
import App from "./App";
import renderer, { act, create } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import Prefecture from "./Prefecture";
jest.mock("./Prefecture");
jest.mock("./Chart");

//何も入力していない状態で正しくレンダリングが行われるかのテスト
test("renders test", () => {
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

//全てのチェックボックスをクリックし、それぞれのグラフが表示されるか、
//そしてチェックボックスをもう一度クリックしたときに改めてもとの状態に戻るかのテスト
test("click checkbox and change selectbox", () => {
  let view = render(<Prefecture />);
  let input = screen.getAllByRole("checkbox");
  act(() => {
    input.forEach((value) => {
      //チェックボックスを全てクリックする。
      userEvent.click(value);
    });
  });
  
  //スナップショットを確認
  expect(view).toMatchSnapshot();

  //セレクトボックスの値を年少人口に切り替える。
  act(() => {
    userEvent.selectOptions(screen.getByRole("combobox"), "YP");
  })

  //スナップショットを確認
  expect(view).toMatchSnapshot();

  //セレクトボックスの値を生産年齢人口に切り替える。
  act(() => {
    userEvent.selectOptions(screen.getByRole("combobox"), "WP");
  })

  //スナップショットを確認
  expect(view).toMatchSnapshot();

  //セレクトボックスの値を老年人口に切り替える。
  act(() => {
    userEvent.selectOptions(screen.getByRole("combobox"), "GP");
  })

  //スナップショットを確認
  expect(view).toMatchSnapshot();

  act(() => {
    input.forEach((value) => {
      //もう一度チェックボックスを全てクリックする。
      userEvent.click(value);
    });
  });
  
  //セレクトボックスの値を総人口に切り替える。
  act(() => {
    userEvent.selectOptions(screen.getByRole("combobox"), "TP");
  })
  //スナップショットを確認
  expect(view).toMatchSnapshot();

  //セレクトボックスの値を年少人口に切り替える。
  act(() => {
    userEvent.selectOptions(screen.getByRole("combobox"), "YP");
  })

  //スナップショットを確認
  expect(view).toMatchSnapshot();

  //セレクトボックスの値を生産年齢人口に切り替える。
  act(() => {
    userEvent.selectOptions(screen.getByRole("combobox"), "WP");
  })

  //スナップショットを確認
  expect(view).toMatchSnapshot();

  //セレクトボックスの値を老年人口に切り替える。
  act(() => {
    userEvent.selectOptions(screen.getByRole("combobox"), "GP");
  })

  //スナップショットを確認
  expect(view).toMatchSnapshot();
});
