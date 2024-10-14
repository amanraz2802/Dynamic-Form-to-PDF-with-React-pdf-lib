import React, { useState, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

function Form() {
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    date: "",
    gender: "",
    account: [],
    language: "",
  });
  function handleSubmit(event) {
    event.preventDefault();
    console.log(formdata);
    setformdata({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      date: "",
      gender: "",
      account: [],
      language: "",
    });
    console.log(formdata);
  }
  // useEffect to log formdata whenever it changes
  useEffect(() => {
    console.log(formdata);
  }, [formdata]); // Dependency array with formdata

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setformdata((prev) => ({
        ...prev,
        account: checked
          ? [...prev.account, name]
          : prev.account.filter((acc) => acc !== name),
      }));
    } else {
      setformdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(formdata);
  }

  // form to pdf part
  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = page.getSize();
    const fontSize = 12;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    //import images
    const logoImageBytes = await fetch("/svnitLogo.png").then((res) =>
      res.arrayBuffer()
    );

    const logoImage = await pdfDoc.embedPng(logoImageBytes);
    const logoDims = logoImage.scale(0.5);
    const watermarkOpacity = 0.1;

    // Add logo and watermark

    page.drawImage(logoImage, {
      x: 30,
      y: height - 120,
      width: 90,
      height: 90,
    });

    page.drawImage(logoImage, {
      x: 120,
      y: 250,
      width: 300,
      height: 300,
      opacity: watermarkOpacity, // Set the opacity for watermark
    });
    //header part
    page.drawText("Sardar Vallabhbhai National Institute of Technology", {
      x: 140,
      y: height - 50,
      size: 16,
      font: boldFont,
    });
    page.drawText("Surat - 395007 (GUJARAT)", {
      x: 240,
      y: height - 70,
      size: 14,
      font: boldFont,
    });
    page.drawLine({
      start: { x: 20, y: height - 130 },
      end: { x: 575, y: height - 130 },
      color: rgb(1, 0, 0), // This sets the color to red (RGB values range from 0 to 1)
      thickness: 2.5,
    });

    //form heading
    page.drawText("Student database entry", {
      x: 220,
      y: height - 160,
      size: 14,
      font: italicFont,
      font: boldFont,
    });
    //function to make entry of label and input also
    const drawField = (label, value, y) => {
      page.drawText(label, {
        x: 50,
        y,
        size: fontSize,
        font: boldFont,
      });
      page.drawText(value, {
        x: 300,
        y,
        size: fontSize,
        font: font,
      });
    };
    let yPosition = height - 200;
    const lineHeight = 25;

    //form data
    // Draw each field
    drawField("First Name:", formdata.firstName, yPosition);
    yPosition -= lineHeight;

    drawField("Last Name:", formdata.lastName, yPosition);
    yPosition -= lineHeight;

    drawField("Email:", formdata.email, yPosition);
    yPosition -= lineHeight;

    drawField("Password:", formdata.password, yPosition);
    yPosition -= lineHeight;

    drawField("Date:", formdata.date, yPosition);
    yPosition -= lineHeight;

    drawField("Gender:", formdata.gender, yPosition);
    yPosition -= lineHeight;

    drawField("Account:", formdata.account.join(", "), yPosition); // Join array elements as a string
    yPosition -= lineHeight;

    drawField("Language:", formdata.language, yPosition);
    //
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "StudentDatabaseEntry.pdf";
    link.click();
  };
  return (
    <div>
      <div className="w-full max-w-[600px] border-2 h-full rounded-2xl p-5 border-black mx-auto my-10 bg-slate-200">
        <h1 className=" flex justify-center font-bold text-3xl mb-3 mt-1 ">
          Student Database Entry
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="firstName" className="mx-4 mt-6 font-medium">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-2/6 border-2 border-black rounded-lg p-1"
              value={formdata.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label htmlFor="lastName" className="mx-4 mt-6 font-medium">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="w-2/6 border-2 border-black rounded-lg p-1"
              value={formdata.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label htmlFor="email" className="mx-4 mt-6 font-medium">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-2/6 border-2 border-black rounded-lg p-1"
              value={formdata.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="mx-4 mt-6 font-medium">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-2/6 border-2 border-black rounded-lg p-1"
              value={formdata.password}
              onChange={handleChange}
            />
          </div>
          <div className="my-5">
            <label htmlFor="date" className="mx-4 mt-6 font-medium">
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="w-2/6 border-2 border-black rounded-lg p-1"
              value={formdata.date}
              onChange={handleChange}
            />
          </div>
          <fieldset className="border-4 p-3 w-3/4 mx-3 font-bold rounded-xl border-green-600 my-5">
            <legend>Gender:</legend>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              checked={formdata.gender === "male"}
              onChange={handleChange}
            />
            <label htmlFor="male" className="font-medium mr-3">
              Male
            </label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              checked={formdata.gender === "female"}
              onChange={handleChange}
            />
            <label htmlFor="female" className="font-medium mr-3">
              Female
            </label>
            <input
              type="radio"
              name="gender"
              id="others"
              value="others"
              checked={formdata.gender === "others"}
              onChange={handleChange}
            />
            <label htmlFor="others" className="font-medium mr-3">
              Others
            </label>
          </fieldset>

          <fieldset className="border-4 p-3 w-3/4 mx-3 font-bold p-5 rounded-xl border-green-600 my-5">
            <legend>Have account on:</legend>
            <input
              type="checkbox"
              name="insta"
              id="insta"
              checked={formdata.account.includes("insta")}
              onChange={handleChange}
            />
            <label htmlFor="insta" className="font-medium mr-3">
              Instagram
            </label>
            <input
              type="checkbox"
              name="fb"
              id="fb"
              checked={formdata.account.includes("fb")}
              onChange={handleChange}
            />
            <label htmlFor="fb" className="font-medium mr-3">
              Facebook
            </label>
            <input
              type="checkbox"
              name="gmail"
              id="gmail"
              checked={formdata.account.includes("gmail")}
              onChange={handleChange}
            />
            <label htmlFor="gmail" className="font-medium mr-3">
              Gmail
            </label>
          </fieldset>

          <fieldset className="rounded-xl ">
            <label htmlFor="language" className="mx-4 mt-6 font-medium">
              Language
            </label>
            <select
              id="language"
              name="language"
              className="font-sm p-1 m-2 border-2 border-black rounded-xl"
              value={formdata.language}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujrati">Gujrati</option>
            </select>
          </fieldset>
          <div className="flex justify-evenly">
            <button className="mx-auto flex my-5 border-2 px-6 py-2 bg-blue-600 rounded-xl text-white text-xl">
              Submit
            </button>
            <button
              onClick={handleDownloadPDF}
              type="button"
              className="mx-auto flex my-5 border-2 px-6 py-2 bg-blue-600 rounded-xl text-white text-xl"
            >
              Download Pdf
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
