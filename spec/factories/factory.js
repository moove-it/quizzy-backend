import factory from 'factory-girl';
import User from '../../app/models/user';
import Match from '../../app/models/match';
import faker from 'faker';

factory.define('user', User,
  {
    email: () => faker.internet.email(),
    password: () => faker.internet.password()
  }
);

factory.define('match', Match, {
	url: () => faker.random.number(),
	isRealTime: () => faker.random.boolean(),
	players: [
		() => faker.internet.userName(),
		() => faker.internet.userName()
	],
	owner: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
	endingDate: () => faker.date.future(),
	game: {
			// id: { type: () => faker.random.number },
			name: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
			description: () => faker.lorem.sentence(),
			rating: () => faker.random.number(),
			timesPlayed: () => faker.random.number(),
			creator: () => faker.fake('{{name.firstName}} {{name.lastName}}'),
			questions: fakeQuestions(),
			tags: [
				() => faker.random.word(),
				() => faker.random.word()
			],
			ranking: [{
					user: () => faker.internet.userName(),
					points: () => faker.random.number()
			}],
			endingDate: () => faker.date.past(),
			image: () => faker.image.imageUrl()
	},
	result: [
		() => faker.random.number(),
		() => faker.random.number()
	]
});

function fakeQuestions() {
	let question, questionSet = [];
	for(let i = 0; i < 4; i++) {
		question = {
			// id: { type: () => faker.random.number() },
			text: () => faker.lorem.sentence(),
			difficulty: () => faker.random.arrayElement(["low", "medium", "high"]),
			answers: ['resp1', 'resp2', 'resp3', 'resp4'],
			correctAnswer: () => faker.random.number({ min:1, max:4 })
		}
		questionSet.push(question);
	}
	return questionSet;
}

export default factory;