describe("Login Page", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("http://localhost:4200/auth/login"); // Replace with the actual URL of your login page
  });

  it("should display the login form", () => {
    // Check if the login form elements are visible

    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get("button").contains("Masuk Sekarang").should("be.visible");
  });

  it("should display an error message for invalid login", () => {
    // Fill in the login form with invalid data
    cy.get('input[name="email"]').type("foktvn04@gmail.com");
    cy.get('input[name="password"]').type("anjay123");

    // Submit the form
    cy.get("button").contains("Masuk Sekarang").click();

    // Check if an error message is displayed (adjust this selector according to your UI)
    cy.get(".toast-message").should("be.visible");
  });

  it("should login successfully with valid credentials", () => {
    // Fill in the login form with valid data
    cy.get('input[name="email"]').type("foktvn04@gmail.com"); // Replace with your valid email
    cy.get('input[name="password"]').type("Anjay123"); // Replace with your valid password

    // Submit the form
    cy.get("button").contains("Masuk Sekarang").click();

    // Memeriksa apakah login berhasil dengan memverifikasi pengalihan atau pesan keberhasilan
    cy.url().should("eq", "localhost:4200/dashboard"); // Gantilah dengan URL yang diharapkan setelah login berhasil
  });

  // Anda dapat menambahkan lebih banyak kasus pengujian untuk penanganan error, validasi, dll.
});
