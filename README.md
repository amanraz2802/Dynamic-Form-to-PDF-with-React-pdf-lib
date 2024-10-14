# React Form to PDF Converter

This project is a simple React application that allows users to fill out a basic form with fields like first name, last name, email, password, and includes options like radio buttons, checkboxes, and select options. The form data is then converted into a PDF format using the `pdf-lib` package.

## Features

- Basic form fields: First Name, Last Name, Email, Password
- Radio buttons, checkboxes, and select options
- Converts form data to PDF using `pdf-lib`
- User-friendly interface

## Technologies Used

- React.js
- Tailwind CSS (for styling)
- `pdf-lib` (for generating PDFs)

## Getting Started

To get a local copy of the project up and running, follow these simple steps:

### Prerequisites

Ensure you have `npm` and Node.js installed on your machine.

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/react-form-to-pdf.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-form-to-pdf
   ```

3. Install the necessary packages:
   ```bash
   npm install
   ```

### Running the App

To run the app in development mode, use:

```bash
npm start


```

/src
/components
Form.js # Main form component including PDF generation logic using pdf-lib
App.js # Main app component
index.js # Entry point
