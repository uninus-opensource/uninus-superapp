import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SearchInput from ".";
import "@testing-library/jest-dom";
import IconSearch from "./ic-search";

describe("SearchInput Component", () => {
  it("should have a valid className", () => {
    const { getByRole } = render(<SearchInput />);
    const search = getByRole("search");
    expect(search).toHaveClass(
      "block lg:w-30% w-80% p-2 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500",
    );
  });
  it("Should have label with text 'Search'", () => {
    const { getByLabelText } = render(<SearchInput />);
    const label = getByLabelText("Search");
    expect(label).toBeInTheDocument();
  });
  it("should have the provided placeholder", () => {
    const placeholderText = "Search here";
    const { getByRole } = render(<SearchInput placeholder={placeholderText} />);
    const searchInput = getByRole("search");
    expect(searchInput).toHaveAttribute("placeholder", placeholderText);
  });
  it("should display the search icon", () => {
    render(<IconSearch />);
    const icon = screen.getByTestId("search-icon");
    expect(icon).toBeInTheDocument();
  });
  it("should call onChange function and display the changed value", () => {
    const mockOnChange = jest.fn();
    const placeholderText = "Search here";
    const { getByRole } = render(
      <SearchInput onChange={mockOnChange} value="" placeholder={placeholderText} />,
    );
    const newInputValue = "New Search Value";
    const searchInput = getByRole("search") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: newInputValue } });
    expect(searchInput.value).toBe(newInputValue);
  });
});
