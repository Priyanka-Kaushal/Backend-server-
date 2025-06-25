// controllers/contactController.js

const Contact = require("../../modelsDb/contactModal");
const { sendContactEmail } = require("../../utils/mailSender"); // ✅ correct import

const contactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log("bodyyyyyyy :", req.body);

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, subject, message) are required.",
      });
    }

    // ✅ Send email to admin
    await sendContactEmail(
      "priyankakaushal2308@gmail.com",
      email,
      `Contact Form: ${subject}`,
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      `<p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Subject:</strong> ${subject}</p>
       <p><strong>Message:</strong><br/>${message}</p>`
    );

    // ✅ Save contact form in DB
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    const contactInfo = await newContact.save();
    console.log("contact info:", contactInfo);

    return res.status(201).json({
      success: true,
      message: "Your message has been received. We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong — your message was not sent.",
    });
  }
};

module.exports = { contactForm };
