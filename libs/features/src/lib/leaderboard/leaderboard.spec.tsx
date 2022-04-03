import { render } from "@testing-library/react";

import Leaderboard from "./leaderboard";

describe("Leaderboard", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Leaderboard users={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
