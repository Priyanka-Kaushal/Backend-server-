// const axios = require("axios");
// require("dotenv").config();

// exports.sendPaymentAlert = async (req, res) => {
//   const { customerName, amount, product } = req.body;

//   try {
//     await axios.post(
//       `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
//       {
//         messaging_product: "whatsapp",
//         to: 918955588935,
//         type: "template",
//         template: {
//           name: "payment_success",
//           language: { code: "en_US" },
//           components: [
//             {
//               type: "body",
//               parameters: [
//                 { type: "text", text: customerName },
//                 { type: "text", text: amount },
//                 { type: "text", text: product },
//               ],
//             },
//           ],
//         },
        
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.status(200).json({ message: "WhatsApp message sent" });
//   } catch (err) {
//     console.error("WhatsApp API Error:", err.response?.data || err.message);
//     res.status(500).json({ error: "Failed to send WhatsApp message" });
//   }
// };
// controllers/whatsappController.js
const axios = require("axios");
require("dotenv").config();

exports.sendPaymentAlert = async (req, res) => {
  const { customername, amount, product } = req.body;
  console.log("reqq.body :", req.body);

  if (!customername || !amount || !product) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log(customername);
   console.log(amount);
    console.log(product);
  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: process.env.TEST_RECIPIENT,
        type: "template",
        template: {
          name: "payment",
          language: { code: "en_US" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: customername },
                { type: "text", text: amount },
                { type: "text", text: product },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: "WhatsApp message sent" });
  } catch (err) {
    console.error("WhatsApp API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to send WhatsApp message" });
  }
};
