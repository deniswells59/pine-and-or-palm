import axios  from 'axios';
import jwt    from 'jsonwebtoken';
import paypal from 'paypal-rest-sdk';
import times  from 'async/times';

import CartController from './cart';

class CheckoutController {
  constructor(router) {
    this.router = router;
    this.CartController = new CartController(router);
    this.registerRoutes();

    this.paypal = paypal.configure({
      'mode': 'sandbox', //sandbox or live
      'client_id': process.env.PP_ID,
      'client_secret': process.env.PP_SECRET
    });
  }

  registerRoutes() {
    this.router.get('/checkout', this.checkout.bind(this));
  }

  checkout(req, res) {
    if(!req.cookies.sessionId) res.status(400).send('No Cart, bro');

    this.CartController.getCart(req.cookies.sessionId)
      .then(cart => {
        return this.paypalPurchase(cart);
      })
      .then(payment => {
        res.cookie('paypal', payment.id).send(payment.redirectUrl);
      })
      .catch(err => {
        res.status(400).end();
      })
  }

  paypalPurchase() {
    return new Promise((resolve, reject) => {
      var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cart"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
      };


      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) return reject(error);

				let redirectUrl;
				payment.links.forEach(l => {
					if(l.method === 'REDIRECT') redirectUrl = l.href;
				});
        return resolve({ id: payment.id,  redirectUrl });
      });
    })
  }
}

module.exports = CheckoutController;
