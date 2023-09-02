import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "./index";
import "@testing-library/jest-dom";

function MockImage(props: any) {
  return React.createElement("img", props);
}

jest.mock("next/image", () => MockImage);

describe("Test Footer Content", () => {
  it("Should Defined", () => {
    const { getByRole } = render(<Footer />);
    expect(getByRole("navigation")).toBeDefined();
  });
});

describe("Footer Component", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId, getAllByText } = render(<Footer />);

    const copyrightText = getByText("© NEO UNIVERSITAS ISLAM NUSANTARA 2023");
    expect(copyrightText).toBeInTheDocument();

    const addressText = getAllByText(
      "Jl. Soekarno Hatta No.530, Sekejati, Kec. Buahbatu, Kota Bandung, Jawa Barat 40286",
    );
    expect(addressText).toBeDefined();

    const phoneNumber = getAllByText("0821-1686-0530");
    expect(phoneNumber).toBeDefined();

    const officialSiteText = getAllByText("SITUS RESMI UNINUS");
    expect(officialSiteText).toBeDefined();

    const downloadBrosurText = getAllByText("UNDUH BROSUR");
    expect(downloadBrosurText).toBeDefined();

    const campusLocationText = getAllByText("LOKASI KAMPUS");
    expect(campusLocationText).toBeDefined();

    const facebookIcon = getByTestId("facebook-icon");
    expect(facebookIcon).toBeInTheDocument();

    const fileIcon = getByTestId("file-icon");
    expect(fileIcon).toBeInTheDocument();

    const youtubeIcon = getByTestId("youtube-icon");
    expect(youtubeIcon).toBeInTheDocument();

    const instagramIcon = getByTestId("instagram-icon");
    expect(instagramIcon).toBeInTheDocument();

    const mailIcon = getByTestId("mail-icon");
    expect(mailIcon).toBeInTheDocument();
  });
});
