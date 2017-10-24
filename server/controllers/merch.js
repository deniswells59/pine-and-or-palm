import axios from 'axios';
import WooCommerceAPI from 'woocommerce-api';

class MerchController {
  constructor(router) {
      this.router = router;
      this.registerRoutes();
      this.merch = [
        {
          "id": 0,
          "name": 'Tie-Dyed T-Shirt',
          "img": 'tyedyed',
          "price": '25.50',
          "sizes": {
            "S": 10,
            "M": 10,
            "L": 5,
            "XL": 5,
            "XXL": 3,
          }
        }
      ];

      this.WooCommerce = new WooCommerceAPI({
        url: 'http://pineandorpalm.com:8080',
        consumerKey: process.env.WC_CONSUMER_KEY,
        consumerSecret: process.env.WC_SECRET,
        wpAPI: true,
        version: 'wc/v1'
      });
  }

  registerRoutes() {
    this.router.get('/merch', this.getMerch.bind(this));
  }

  getMerch(req, res) {
    this.WooCommerce.getAsync('products')
      .then(result => {
        let data = result.body;
        res.send(data);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
}

module.exports = MerchController;
