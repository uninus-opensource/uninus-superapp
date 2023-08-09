import React from "react";
import { render } from "@testing-library/react";
import { KartuPembayaran } from ".";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-pdf-tailwind", () => ({
  createTw: jest.fn(() => (styles) => styles),
}));
jest.mock("../fonts", () => ({
  montserrat: "/path/to/montserrat/font",
  montserratBold: "/path/to/montserratBold/font",
}));
jest.mock("@react-pdf/renderer", () => ({
  Page: jest.fn(({ children }) => <div>{children}</div>),
  Text: jest.fn(({ children }) => <span>{children}</span>),
  View: jest.fn(({ children }) => <div>{children}</div>),
  Document: jest.fn(({ children }) => <div>{children}</div>),
  Image: jest.fn(({ src }) => <img src={src} alt="mocked-image" />),
  Font: {
    register: jest.fn(),
  },
  Link: jest.fn(({ children }) => <a>{children}</a>),
}));

describe("KartuPembayaran component", () => {
  test("renders correctly", () => {
    const { getByText, queryAllByAltText } = render(<KartuPembayaran />);

    const mockedImageElements = queryAllByAltText("mocked-image");

    const specificImageElement = mockedImageElements[0];

    expect(getByText("BUKTI PENDAFTARAN")).toBeInTheDocument();
    expect(specificImageElement).toBeInTheDocument();
  });
});
