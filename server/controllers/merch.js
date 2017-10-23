'use strict';

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
  }

  registerRoutes() {
    this.router.get('/merch', this.getMerch.bind(this));
  }

  getMerch(req, res) {
    res.send(this.merch);
  }
}

module.exports = MerchController;
