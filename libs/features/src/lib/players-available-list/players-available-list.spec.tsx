import { render } from "@testing-library/react";

import PlayersAvailableList from "./players-available-list";

describe("PlayersAvailableList", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PlayersAvailableList users={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
