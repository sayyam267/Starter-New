require("dotenv").config();
const secret_key = process.env.STRIPE_SECRET;
const public_key = process.env.STRIPE_PUBLIC;
const stripe = require("stripe")(secret_key);

module.exports={
    postPayment:async(data)=>{
        stripe.customers.create({
            email:
            source
        })
    }
}
