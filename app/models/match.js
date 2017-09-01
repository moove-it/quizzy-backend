import mongoose, { Schema } from 'mongoose';

var matchSchema = new Schema ({
<<<<<<< 0dcb3135643b07e52e06ecd31f3b2f688100a6d9
	url: {
    type: String,
    unique: true
  },
	isRealTime: Boolean,
	players: [String],
	owner: String,
	endingDate: Date,
	game: {
			url : { type: Number, index: true },
			name : String,
			description : String,
			rating : Number,
			timesPlayed : Number,
			creator : String,
			questions : [{
					id : { type: Number, index: true },
					text : String,
					difficulty : String,
					answers : [String],
					correctAnswer : Number
			}],
			tags : [String],
			ranking : [{
					user: String,
					points: Number
			}],
			creationDate : Date,
			image : String
	},
	result: [Number]
=======
    // id : { 
    //     type: Number,
    //     unique: true
    // },
    isRealTime: Boolean,
    players: [String],
    owner: String,
    endingDate: Date,
    game: {
        // id : { type: Number, index: true },
        name: String,
        description: String,
        rating: Number,
        timesPlayed: Number,
        creator: String,
        questions: [String],
        tags: [String],
        // ranking : [(String, Number)],
        creationDate: Date,
        image: String
    },
    result: [Number]
>>>>>>> Add matches_view and comment out parts of the match model
})

class MatchClass {}

matchSchema.loadClass(MatchClass);

export default mongoose.model('Match', matchSchema);