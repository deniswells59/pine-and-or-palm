import axios from 'axios';
import jwt from 'jsonwebtoken';

import Cart from '../models/Cart';

class CartController {
  constructor(router) {
    this.router = router;
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

  sendCart(req, res) {
    if(!req.query.sessionId) return this.createCart(req, res); // Get this guy out of here

    this.convertJWT(req.query.sessionId)
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
    Cart.create({})
      .then((cart) => {
        // Encrypt because why not?
        let sessionId = jwt.sign({ sessionId: cart._id }, process.env.JWT_SECRET);
        res.send({ sessionId });
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  }

  addToCart(req, res) {
    console.log(req.body);
    if(!req.body.sessionId) return this.createCart(req, res); // Get this guy out of here
    if(!req.body.items) return res.status(400).send('Nothing to add. What ya tryin to pull, buddy?')

    this.convertJWT(req.body.sessionId)
      .then(decoded => {
        let sessionId = decoded.sessionId;
        return Cart.update(
          { _id: sessionId },
          { $push: { items: req.body.items }}
        )
      })
      .then(() => {
        res.end();
      })
      .catch(err => {
        res.status(400).send(err);
      })
  }

}

module.exports = CartController;
