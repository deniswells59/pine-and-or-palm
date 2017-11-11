import mongoose from 'mongoose';
import ttl from 'mongoose-ttl';


const cartSchema = new mongoose.Schema({
  items:[{
    id: { type: String, required: true },
    variationId: { type: String },
  }]
}, { timestamps: true });

cartSchema.plugin(ttl, {
                        ttl: 60000 * 60 * 24 * 14,  // Remove after one week
                        interval: 60 * 60 * 24 // Check everyday
                      });
module.exports = mongoose.model('Cart', cartSchema);
