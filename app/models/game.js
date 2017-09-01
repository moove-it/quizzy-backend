import mongoose, { Schema } from 'mongoose';
import questionSchema from './question';

gameSchema = new Schema({
  id : { type: Number, index: true },
  name : String,
  description : String,
  rating : Number,
  timesPlayed : Number,
  creator : String,
  questions : [questionSchema],
  tags : [String],
  ranking : [{
  	user: String,
  	ranking: Number
  }],
  creationDate : Date,
  image : String
})

class GameClass {}

gameSchema.loadClass(GameClass);

export default mongoose.model('Game', gameSchema);