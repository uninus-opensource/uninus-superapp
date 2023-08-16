import React from "react";
import { render } from "@testing-library/react";
import { BreadCrumb } from ".";
import "@testing-library/jest-dom";
describe("BreadCrumb component", () => {
  const items = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Category", link: "/products/category" },
  ];

  it("renders the correct number of breadcrumb items", () => {
    const { getAllByText } = render(<BreadCrumb items={items} />);
    const breadcrumbItems = getAllByText(/Home|Products|Category/);
    expect(breadcrumbItems).toHaveLength(3);
  });
  it("renders the correct breadcrumb items", () => {
    const { getByText } = render(<BreadCrumb items={items} />);

    items.forEach((item) => {
      const linkElement = getByText(item.name);
      expect(linkElement).toBeInTheDocument();
    });
  });
  it("Should to Have a Valid className", () => {
    const { getByTestId } = render(<BreadCrumb items={items} />);
    const bread = getByTestId("breadcrumb");
    expect(bread).toHaveClass("grid place-content-start w-full font-bold text-xs md:text-sm");
  });
  it("renders icons correctly", () => {
    const { getAllByTestId } = render(<BreadCrumb items={items} />);
    const chevronIcons = getAllByTestId("bread-icon");
    expect(chevronIcons).toHaveLength(items.length - 1);
  });
});
