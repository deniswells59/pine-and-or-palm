import mongoose from 'mongoose';
import ttl from 'mongoose-ttl';


const cartSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now, index: { expires: 3000 } },
  items:[{ type: Object }]
}, { timestamps: true });

cartSchema.plugin(ttl, {
                        ttl: 60*60*24*14,  // Remove after one week
                        interval: 60*60*24 // Check everyday
                      });
module.exports = mongoose.model('Cart', cartSchema);
