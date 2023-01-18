import "whatwg-fetch";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, it } from "vitest";
import App from "../src/App";
import { store } from "../src/store/store.config";

it("Render app and the user can go with the happy senario", async () => {
  // ** Render App
  const appComponent = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // ** Type People to search
  const inputSearch =
    appComponent.container.querySelector("input[type=search]");
  fireEvent.change(inputSearch as Element, { target: { value: "People" } });
  expect(inputSearch).toHaveValue("People");

  // ** Click Button
  const searchButton = appComponent.container.querySelector("button");
  fireEvent.click(searchButton as Element);
  expect(searchButton).toBeDisabled();

  await waitFor(async () => {
    expect(
      appComponent.container.querySelector(".MuiCircularProgress-root")
    ).toBeInTheDocument();
  });

  await new Promise((r) => setTimeout(r, 3000));

  await waitFor(() => {
    return expect(
      appComponent.container.querySelectorAll(".doc-container").length
    ).toBeGreaterThanOrEqual(1);
  });
});
