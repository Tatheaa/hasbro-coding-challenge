import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("App Component", () => {
  test("renders the title correctly", () => {
    render(<App />);
    expect(
      screen.getByText(
        "TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000"
      )
    ).toBeInTheDocument();
  });
});
