// // const OrderStatus = require("../modelsDb/whatsappOrder");
// // const axios = require("axios");

// // const verifyWebhook = (req, res) => {
// //   const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN
// //   const VERIFY_TOKEN = "shonaz-secret";

// //   const mode = req.query["hub.mode"];
// //   const challenge = req.query["hub.challenge"];
// //   const token = req.query["hub.verify_token"];
   

// //   const mytoken = "";

// //   if(mode && token){

// //      if (mode==="subscribe" && token===mytoken) {
// //     console.log("Webhook verified!");
// //     return res.status(200).send(challenge);
// //   } else {
// //     return res.sendStatus(403);
// //   }

// //   }
  
// // };


// // // const receiveWhatsappWebhook = async (req, res) => {
// // //   const data = req.body;
// // //   console.log("Webhook received:", JSON.stringify(data, null, 2));
// // //   if (data.object){
// // //     if(data.entry && 
// // //       data.entry[0].changes && 
// // //       data.entry[0].changes[0].value.message && 
// // //       data.entry[0].changes[0].value.mssage[0]
// // //       )
// // //        {

// // //     }
// // //   }
// // //   // const payload = data?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.button?.payload;
// // //   // const waNumber = data?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

// // //   if (payload === "QUICK_APPROVAL") {
// // //     console.log("Owner approved order via WhatsApp button.");
// // //     // Update DB + respond
// // //     return res.status(200).send("Received approval");
// // //   }

// // //   res.sendStatus(200);
// // // };

// // const receiveWhatsappWebhook = async (req, res) => {
// //   const body = req.body;

// //   console.log("📨 Incoming Webhook:", JSON.stringify(body, null, 2));

// //   if (
// //     body.object &&
// //     body.entry &&
// //     body.entry[0].changes &&
// //     body.entry[0].changes[0].value.messages &&
// //     body.entry[0].changes[0].value.messages[0]
// //   ) {
// //     const messageObj = body.entry[0].changes[0].value.messages[0].text.body;
// //     // const from = messageObj.from; 
// //     const from = body.entry[0].changes[0].value.messages[0].form;
// //     const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
    

// //     axios({
// //       method: "POST",
// //       url:"https://graph.facebook.com/v19.0/${phone_number_id}/messages?access_token="+token,
// //       data: {
// //         messaging_product: "whatsapp",
// //               to: from,
// //               type: "text",
// //               text: {
// //                 body: `Hii am priyanka!`,
// //               },
// //       },
// //       headersheaders: {
// //                 Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
// //                 "Content-Type": "application/json",
// //               },
// //     });
// //     res.sendStatus(200);
// //   } else{
// //     res.sendStatus(403);
// //   }
// // };
// //   //   const customerPhone = `+${from}`;

// //   //   // Handle text message
// //   //   if (messageObj.type === "text") {
// //   //     const text = messageObj.text.body;
// //   //     console.log(`📨 Text message from ${customerPhone}: ${text}`);
// //   //     return res.sendStatus(200);
// //   //   }

// //   //   // Handle button response (Quick Reply)
// //   //   if (messageObj.type === "button") {
// //   //     const payload = messageObj.button.payload;

// //   //     if (payload === "QUICK_APPROVAL") {
// //   //       const order = await OrderStatus.findOneAndUpdate(
// //   //         { customerPhone },
// //   //         { status: "Approved" },
// //   //         { new: true }
// //   //       );

// //   //       if (order) {
// //   //         await axios.post(
// //   //           `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
// //   //           {
// //   //             messaging_product: "whatsapp",
// //   //             to: from,
// //   //             type: "text",
// //   //             text: {
// //   //               body: `Hi ${order.customerName}, your order for "${order.product}" has been approved and will be delivered in 7 days.`,
// //   //             },
// //   //           },
// //   //           {
// //   //             headers: {
// //   //               Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
// //   //               "Content-Type": "application/json",
// //   //             },
// //   //           }
// //   //         );
// //   //       }

// //   //       return res.status(200).send("✅ Order approved");
// //   //     }

// //   //     if (payload === "REJECT_PRODUCT") {
// //   //       const order = await OrderStatus.findOneAndUpdate(
// //   //         { customerPhone },
// //   //         { status: "Unavailable" },
// //   //         { new: true }
// //   //       );

// //   //       if (order) {
// //   //         await axios.post(
// //   //           `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
// //   //           {
// //   //             messaging_product: "whatsapp",
// //   //             to: from,
// //   //             type: "text",
// //   //             text: {
// //   //               body: `Hi ${order.customerName}, we're sorry, but the product "${order.product}" is currently unavailable.`,
// //   //             },
// //   //           },
// //   //           {
// //   //             headers: {
// //   //               Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
// //   //               "Content-Type": "application/json",
// //   //             },
// //   //           }
// //   //         );
// //   //       }

// //   //       return res.status(200).send("🚫 Order rejected");
// //   //     }
// //   //   }
// //   // }

// //   // // Fallback
// //   // res.sendStatus(200);
// // };


// // module.exports = { verifyWebhook, receiveWhatsappWebhook };
// const axios = require("axios");
// const OrderStatus = require("../modelsDb/whatsappOrder");

// // ✅ VERIFY WEBHOOK (GET)
// // const verifyWebhook = (req, res) => {
// //   const VERIFY_TOKEN = "shonaz-secret";

// //   const mode = req.query["hub.mode"];
// //   const token = req.query["hub.verify_token"];
// //   const challenge = req.query["hub.challenge"];

// //   if (mode && token) {
// //     if (mode === "subscribe" && token === VERIFY_TOKEN) {
// //       console.log("✅ Webhook verified");
// //       return res.status(200).send(challenge);
// //     } else {
// //       return res.sendStatus(403);
// //     }
// //   }
// //   res.sendStatus(400);
// // };

// const verifyWebhook = (req, res) => {
//   const VERIFY_TOKEN = "shonaz-secret";

//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
//     console.log("✅ Webhook verified!");
//     return res.status(200).send(challenge);
//   }

//   return res.sendStatus(403);
// };


// // ✅ HANDLE INCOMING WHATSAPP WEBHOOK (POST)
// const receiveWhatsappWebhook = async (req, res) => {
//   try {
//     const body = req.body;
//     console.log("📨 Incoming WhatsApp Webhook:", JSON.stringify(body, null, 2));

//     const entry = body?.entry?.[0];
//     const changes = entry?.changes?.[0]?.value;
//     const message = changes?.messages?.[0];
//     const metadata = changes?.metadata;

//     if (!message || !metadata) {
//       return res.sendStatus(403);
//     }

//     const phone_number_id = metadata.phone_number_id;
//     const from = message.from; // customer WhatsApp number
//     const msg_type = message.type;

//     // ✅ Handle Text Message
//     if (msg_type === "text") {
//       const text = message.text.body;
//       console.log(`📥 Text from ${from}: ${text}`);

//       await axios.post(
//         `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
//         {
//           messaging_product: "whatsapp",
//           to: from,
//           type: "text",
//           text: {
//             body: `Hi! Thank you for your message: "${text}" 😊`,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       return res.sendStatus(200);
//     }

//     // ✅ Handle Button Clicks (Quick Reply)
//     if (msg_type === "button") {
//       const payload = message.button.payload;
//       const customerPhone = `+${from}`;

//       // Approve order
//       if (payload === "QUICK_APPROVAL") {
//         const order = await OrderStatus.findOneAndUpdate(
//           { customerPhone },
//           { status: "Approved" },
//           { new: true }
//         );

//         if (order) {
//           await axios.post(
//             `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
//             {
//               messaging_product: "whatsapp",
//               to: from,
//               type: "text",
//               text: {
//                 body: `Hi ${order.customerName}, your order for "${order.product}" has been approved and will be delivered in 7 days. ✅`,
//               },
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//         }

//         return res.status(200).send("✅ Order approved");
//       }

//       // Reject product
//       if (payload === "REJECT_PRODUCT") {
//         const order = await OrderStatus.findOneAndUpdate(
//           { customerPhone },
//           { status: "Unavailable" },
//           { new: true }
//         );

//         if (order) {
//           await axios.post(
//             `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
//             {
//               messaging_product: "whatsapp",
//               to: from,
//               type: "text",
//               text: {
//                 body: `Hi ${order.customerName}, unfortunately, the product "${order.product}" is currently unavailable. 😔`,
//               },
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//         }

//         return res.status(200).send("🚫 Order rejected");
//       }
//     }

//     return res.sendStatus(200); // default success
//   } catch (error) {
//     console.error("❌ Webhook error:", error.message);
//     return res.sendStatus(500);
//   }
// };

// module.exports = {
//   verifyWebhook,
//   receiveWhatsappWebhook,
// };
const axios = require("axios");
const OrderStatus = require("../modelsDb/whatsappOrder");

// ✅ Verify Webhook (GET)
const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = "shonaz-secret"; // must match Meta Dashboard

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified!");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

// ✅ Receive Webhook (POST)
const receiveWhatsappWebhook = async (req, res) => {
  try {
    const body = req.body;
    console.log("📨 Incoming WhatsApp Webhook:", JSON.stringify(body, null, 2));

    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0]?.value;
    const message = changes?.messages?.[0];
    const metadata = changes?.metadata;

    if (!message || !metadata) {
      return res.sendStatus(403);
    }

    const phone_number_id = metadata.phone_number_id;
    const from = message.from;
    const msg_type = message.type;

    // ✅ Handle Text Messages
    if (msg_type === "text") {
      const text = message.text.body;
      console.log(`📥 Text from ${from}: ${text}`);

      await axios.post(
        `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
        {
          messaging_product: "whatsapp",
          to: from,
          type: "text",
          text: {
            body: `Hi! Thank you for your message: "${text}" 😊`,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.sendStatus(200);
    }

    // ✅ Handle Button Replies
    if (msg_type === "button") {
      const payload = message.button.payload;
      const customerPhone = `+${from}`;

      if (payload === "QUICK_APPROVAL") {
        const order = await OrderStatus.findOneAndUpdate(
          { customerPhone },
          { status: "Approved" },
          { new: true }
        );

        if (order) {
          await axios.post(
            `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
            {
              messaging_product: "whatsapp",
              to: from,
              type: "text",
              text: {
                body: `Hi ${order.customerName}, your order for "${order.product}" has been approved and will be delivered in 7 days. ✅`,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );
        }

        return res.status(200).send("✅ Order approved");
      }

      if (payload === "REJECT_PRODUCT") {
        const order = await OrderStatus.findOneAndUpdate(
          { customerPhone },
          { status: "Unavailable" },
          { new: true }
        );

        if (order) {
          await axios.post(
            `https://graph.facebook.com/v19.0/${phone_number_id}/messages`,
            {
              messaging_product: "whatsapp",
              to: from,
              type: "text",
              text: {
                body: `Hi ${order.customerName}, we're sorry but the product "${order.product}" is currently unavailable. 😔`,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
              },
            }
          );
        }

        return res.status(200).send("🚫 Order rejected");
      }
    }

    // Fallback success
    return res.sendStatus(200);
  } catch (error) {
    console.error("❌ Webhook error:", error.response?.data || error.message);
    return res.sendStatus(500);
  }
};

module.exports = {
  verifyWebhook,
  receiveWhatsappWebhook,
};
