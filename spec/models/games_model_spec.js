import chai, {
  expect
} from 'chai';
import factory from '../factories/factory.js';
import app from '../../server.js';
import mongoose from 'mongoose';
import Game from '../../app/models/game';

describe('GamesModel', () => {
  var game;
  var game2;
  var game3;
  var game4;
  var gameWithoutName;
  var gameNameEmpty;
  var gameDupName;
  var gameNegativeRating;
  var gameInvalidRating;
  var gameWithoutCreator;
  var gameWithoutQuestions;
  var gameRankingWithoutUser;
  var gameRankingWithoutPoints;
  var gameInvalidDate;
  var gameWith2answers;
  var gameWith6answers;
  var gameMoreQuestions;

  beforeEach(function(done) {
    factory.createMany('game', 2, [{
      name: 'quizzY'
    }, {
      name: 'Futbol'
    }])
    .then(gameArray => {
      game = gameArray[0];
      game2 = gameArray[1];
      done();
    });
  });

  afterEach(function(done) {
    Game.remove({}, function() {
      done();
    });
  });
  
  factory.attrs('gameMore')
  .then(gameAttrs => { 
    gameMoreQuestions = gameAttrs;
  });

  factory.attrsMany('game', 14, [{
    name: null
  }, {
    name: '       '
  }, {
    name: 'Quizzy'
  }, {
    rating: -2
  }, {
    rating: 8
  }, {
    creator: null
  }, {
    questions: null 
  }, {
    ranking: [{ points: 8 }]
  }, {
    ranking: [{ user: 'sebas' }]
  }, {
    creationDate: 'Lunes 20 de Julio de 1999'
  }, {
    name: 'Juego_Aleatorio-33 44 55' 
  }, {
    name: '1324'
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'Easy',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2'
      }, {
        answer: 'ans3'
      }, {
        answer: 'ans4'
      }, {
        answer: 'ans5'
      }, {
        answer: 'ans6' 
      }],
      correctAnswer: 4
    }]
  }, {
    questions: [{
      text: 'ques',
      difficulty: 'Easy',
      answers: [{
        answer: 'ans1'
      }, {
        answer: 'ans2' 
      }],
      correctAnswer: 1
    }]
  }])
  .then(gameAttrsArray => {
    gameWithoutName = gameAttrsArray[0];
    gameNameEmpty = gameAttrsArray[1];
    gameDupName = gameAttrsArray[2];
    gameNegativeRating = gameAttrsArray[3];
    gameInvalidRating = gameAttrsArray[4];
    gameWithoutCreator = gameAttrsArray[5];
    gameWithoutQuestions = gameAttrsArray[6];
    gameRankingWithoutUser = gameAttrsArray[7];
    gameRankingWithoutPoints = gameAttrsArray[8];
    gameInvalidDate = gameAttrsArray[9];
    game3 = gameAttrsArray[10];
    game4 = gameAttrsArray[11];
    gameWith6answers = gameAttrsArray[12];
    gameWith2answers = gameAttrsArray[13];
  })

  describe('Without name', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameWithoutName, (err, game) => {
        expect(err).to.match(/you must enter a name/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();        
        });
      });
    });
  });

  describe('Name empty', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameNameEmpty, (err, game) => {
        expect(err).to.match(/you must enter a name/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();        
        });
      });
    });
  });

  describe('Same name', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameDupName, (err, game) => {
        expect(err).to.match(/E11000 duplicate key error collection: quizzy-backend-test.games index: name_1/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Negative Rating', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameNegativeRating, (err, game) => {
        expect(err).to.match(/there must be a correct rating/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Rating out of range', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameInvalidRating, (err, game) => {
        expect(err).to.match(/there must be a correct rating/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });
  
  describe('Without creator', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameWithoutCreator, (err, game) => {
        expect(err).to.match(/must have a creator/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });
      });
    });
  });

  describe('Without questions', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameWithoutQuestions, (err, game) => {
        expect(err).to.match(/there must be at least one question/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();  
        });
      });
    });
  });

  describe('Ranking without user', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameRankingWithoutUser, (err, game) => {
        expect(err).to.match(/ranking must have a user/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();  
        }); 
      });
    });
  });

  describe('Ranking without points', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameRankingWithoutPoints, (err, game) => {
        expect(err).to.match(/ranking must have a points/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();
        });      
      });
    });
  });

  describe('Invalid date', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameInvalidDate, (err, game) => {
        expect(err).to.match(/Cast to Date failed/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();  
        });
      });
    });
  });

  describe('Name with only numbers', () => {
    it('does not returns error and creates a game', (done) => {
      Game.create(game3, (err, game) => {
        expect(err).to.eq(null);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done(); 
        });
      });
    });
  });

  describe('Name with "_", "-" and " "', () => {
    it('does not returns error', (done) => {
      Game.create(game4, (err, game) => {
        expect(err).to.eq(null);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('With 6 answers', () => {
    it('does not returns error', (done) => {
      Game.create(gameWith6answers, (err, game) => {
        expect(err).to.eq(null);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('With 2 answers', () => {
    it('does not returns error', (done) => {
      Game.create(gameWith2answers, (err, game) => {
        expect(err).to.eq(null);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(3);   
          done();
        });
      });
    });
  });

  describe('More questions', () => {
    it('returns correct error and does not create a game', (done) => {
      Game.create(gameMoreQuestions, (err, game) => {
        expect(err).to.match(/there must be between 1 and 30 possibles questions/);
        Game.count({}).exec((err, count) => {
          expect(count).to.eq(2);   
          done();        
        });
      });
    });
  });
});