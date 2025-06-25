// require("dotenv").config();
// const axios = require("axios");

// const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
// const TOKEN = process.env.WHATSAPP_TOKEN;
// const TO_NUMBER = process.env.TEST_RECIPIENT;

// console.log("🔍 Debug:", { PHONE_NUMBER_ID, hasToken: !!TOKEN, TO_NUMBER });

// async function sendHelloWorld() {
//   try {
//     const res = await axios({
//       method: "post",
//       url: `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
//       data: {
//         messaging_product: "whatsapp",
//         to: TO_NUMBER,
//         type: "template",
//         // template: {
//         //   name: "payment", 
//         //   language: { code: "en_US" } 
//         // }
//         template: {
//   name: "payment",          
//   language: { code: "en_US" },         
//   components: [
//     {
//       type: "body",
//       parameters: [
//         { type: "text", text: "Priyanka Kaushal" }, 
//         { type: "text", text: "899" },         
//         { type: "text", text: "T-shirt x2" }  
//       ]
//     }
//   ]
//       },
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//         "Content-Type": "application/json"
//       },
//       timeout: 10000
//     });

//     console.log("API Response:", res.status, res.data);
//   } catch (err) {
//     if (err.response) {
//       console.error("API Error:", err.response.status, err.response.data);
//     } else {
//       console.error("Request Error:", err.message);
//     }
//   }
// }

// sendHelloWorld();

