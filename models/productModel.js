const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please insert the name of product!'],
        },

        description: {
            type: String,
            max: 100,
        },

        images: [
            {
                type: String,
            },
        ],

        breed: {
            type: String,
            required: [true, 'Please insert the breed of the product'],
        },

        price: {
            type: Number,
            required: [true, 'Please insert the price of the product'],
        },

        numReviews: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },

        isAvailable: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    { timestapms: true }
);

//* VIRTUALLY POPULATING REVIEWS
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
