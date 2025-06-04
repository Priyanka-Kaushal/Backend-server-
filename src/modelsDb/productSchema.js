const mongoose  = require("mongoose");


const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    sizes: {
      type: [String],
      required: false,
    },
    colors: {
      type : [String],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// ProductSchema.pre("save", function (next) {
//   // Trim tags
//   if (this.tags && typeof this.tags[0] === "string") {
//     this.tags = this.tags[0].split(",").map((tag) => tag.trim());
//   }
  
//   // Trim sizes
//   if (this.sizes && Array.isArray(this.sizes)) {
//     this.sizes = this.sizes[0].split(",").map((size) => size.trim());
//   }

//   next();
// });

ProductSchema.pre("save", function (next) {
  if (typeof this.tags === "string") {
    this.tags = this.tags.split(",").map((tag) => tag.trim());
  }

  if (Array.isArray(this.tags) && typeof this.tags[0] === "string" && this.tags.length === 1 && this.tags[0].includes(",")) {
    this.tags = this.tags[0].split(",").map((tag) => tag.trim());
  }

  if (Array.isArray(this.sizes) && typeof this.sizes[0] === "string" && this.sizes[0].includes(",")) {
    this.sizes = this.sizes[0].split(",").map((size) => size.trim());
  }

  next();
});


const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
