import { render } from "@testing-library/react";

import PlayersAvailableList from "./players-available-list";

describe("PlayersAvailableList", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PlayersAvailableList />);
    expect(baseElement).toBeTruthy();
  });
});
