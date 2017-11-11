import axios  from 'axios';
import jwt    from 'jsonwebtoken';
import times  from 'async/times';

import MerchController from './merch';
import Cart from '../models/Cart';

class CartController {
  constructor(router) {
    this.router = router;
    this.MerchController = new MerchController();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/cart', this.sendCart.bind(this));
    this.router.post('/cart', this.createCart.bind(this));
    this.router.put('/cart/item', this.addToCart.bind(this));
  }

  convertJWT(id) {
    return new Promise((resolve, reject) => {
      jwt.verify(id, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return reject(err);
        return resolve(decoded);
      })
    })
  }

  getCart(jwt) {
    return new Promise((resolve, reject) => {
      this.convertJWT(jwt)
        .then(decoded => {
          return Cart.findById(decoded.sessionId);
        })
        .then(cart => {
          return resolve(cart);
        })
        .catch(err => {
          return reject(err);
        })
      })
  }

  sendCart(req, res) {
    if(!req.cookies.sessionId) return this.createCart(req, res); // Get this guy out of here

    this.convertJWT(req.cookies.sessionId)
      .then(decoded => {
        let sessionId = decoded.sessionId;
        return Cart.findById(sessionId);
      })
      .then(cart => {
        // After authentication, pass the super confidential information
        if(!cart) return this.createCart(req, res);
        res.send(cart);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  createCart(req, res) {
    // Check if they already identified
    // Probably could use await here but
    // 2 lay-z to learn rn
    if(req.cookies.sessionId) {
      this.convertJWT(req.cookies.sessionId)
        .then(decoded => {
          let sessionId = decoded.sessionId;
          return Cart.findById(sessionId)
        })
        .then(existingCart => {
          if(existingCart && existingCart._id) {
            return res.send(req.cookies.sessionId);
          }
          return Cart.create({});
        })
        .then(cart => {
          // Encrypt because why not?
          let sessionId = jwt.sign({ sessionId: cart._id }, process.env.JWT_SECRET);
          return res.cookie('sessionId', sessionId).send(sessionId);
        })
        .catch(err => {
          return res.status(400).send(err);
        })
    } else {
      Cart.create({})
      .then(cart => {
        // Encrypt because why not?
        let sessionId = jwt.sign({ sessionId: cart._id }, process.env.JWT_SECRET);
        res.cookie('sessionId', sessionId).send(sessionId);
      })
      .catch((err) => {
        res.status(400).send(err);
      })
    }

  }

  addToCart(req, res) {
    if(!req.cookies.sessionId) return this.createCart(req, res); // Get this guy out of here
    if(!req.body.item) return res.status(400).send('Nothing to add. What ya tryin to pull, buddy?')

    let quantity = req.body.qty;
    let sessionId, item;

    this.convertJWT(req.cookies.sessionId)
      .then(decoded => {
        sessionId = decoded.sessionId;
        return this.MerchController.returnMerch();
      })
      .then(wp_merch => {
        let merch = JSON.parse(wp_merch);
        let attrs = req.body.attrs; // Attributes to match
        let selected;

        // First, find the correct item
        for (var key in merch) {
          if (merch.hasOwnProperty(key)) {
            if(merch[key].id === req.body.item.id) {
              item = merch[key];
            }
          }
        }

        // Then loop through the variations of product
        for(let i = 0; i < item.variations.length; i++) {
          let variation = item.variations[i];   // Variation to check
          let varyAttrs = variation.attributes; // Here's the attributes to check
          let correctCount = 0;                 // Tracks how many matches we have

          varyAttrs.forEach(va => { // Loop through this variations
            let name   = va.name;   // Name of  attr
            let option = va.option; // Value of attr

            attrs.forEach(a => {
              if(a[name] && a[name] === option) {
                correctCount++; // If it has this attr, mark it
              }
            })

          })

          if(correctCount === attrs.length) { // If each attr matches
            selected = {
              id: item.id,
              variationId: variation.id
            }
          }
        }

        if(!selected) { // Simple, if no attributes
          selected = {  // This is how easy it could be
            id: item.id // Thanks, wordpress...
          }
        }

        times(quantity, (n, next) => { // Add it per quantity
          Cart.findOneAndUpdate(
            { _id: sessionId },
            { $push: { items: selected }},
            { new: true },
            (err, cart) => {
              next(err, cart);
            }
          )
        }, (err, newCart) => {
          if(err) return res.status(400).send(err);
          res.send(newCart[newCart.length - 1]);
        })
      })
      .catch(err => {
        res.status(400).send(err);
      })
  }

}

module.exports = CartController;
