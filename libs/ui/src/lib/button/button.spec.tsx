import { render, fireEvent } from "@testing-library/react";

import Button from "./button";

describe("Button", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });
  it("has text", () => {
    const { getByText } = render(<Button>Test</Button>);
    expect(getByText("Test")).toBeTruthy();
  });
  it("test onClick", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button onClick={mockOnClick}>Test</Button>);
    fireEvent.click(getByText("Test"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
