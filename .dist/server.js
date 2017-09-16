/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deck = function () {
    function Deck() {
        _classCallCheck(this, Deck);
    }

    _createClass(Deck, null, [{
        key: 'full',
        value: function full() {
            return suits.map(function (s) {
                return numbers.map(function (n) {
                    return {
                        number: n,
                        suit: s
                    };
                });
            }).reduce(function (a, b) {
                return a.concat(b);
            });
        }
    }, {
        key: 'fullShuffled',
        value: function fullShuffled() {
            return this.shuffleDeck(this.full());
        }
    }, {
        key: 'shuffleDeck',
        value: function shuffleDeck(deck) {
            var currentIndex = deck.length,
                temporaryValue,
                randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = deck[currentIndex];
                deck[currentIndex] = deck[randomIndex];
                deck[randomIndex] = temporaryValue;
            }

            return deck;
        }
    }, {
        key: 'getCardColor',
        value: function getCardColor(suit) {
            return suit === '♦' || suit === '♥' ? 'red' : 'black';
        }
    }]);

    return Deck;
}();

exports.default = Deck;


var numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var suits = ['♦', '♣️', '♥', '♠'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deck = __webpack_require__(0);

var _deck2 = _interopRequireDefault(_deck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(id, cards, users) {
        _classCallCheck(this, Game);

        this.id = id;
        this.cards = cards || _deck2.default.fullShuffled();
        this.users = users || [];
    }

    _createClass(Game, [{
        key: 'nextUserTurn',
        value: function nextUserTurn() {
            this.users.push(this.users.shift());
            return this.currentUserTurn;
        }
    }, {
        key: 'addUser',
        value: function addUser(user) {
            user.joinedGameDate = Date.now();
            this.users.push(user);
        }
    }, {
        key: 'userPickCard',
        value: function userPickCard(userId) {
            if (this.currentUserTurn.id === userId) {
                var card = this.cards.pop();

                switch (card.number) {
                    case 'K':
                        {
                            this.currentUserTurn.kingCount++;
                            break;
                        }
                    case '5':
                        {
                            this.users.filter(function (u) {
                                return u.isThumbMaster;
                            }).forEach(function (x) {
                                return x.isThumbMaster = false;
                            });
                            this.currentUserTurn.isThumbMaster = true;
                            break;
                        }
                }

                return card;
            }
        }
    }, {
        key: 'removeUser',
        value: function removeUser(userId) {
            var newUserList = this.users.filter(function (x) {
                return x.id !== userId;
            });
            this.users = newUserList;
        }
    }, {
        key: 'reshuffle',
        value: function reshuffle() {
            this.cards = _deck2.default.fullShuffled();
            this.users.forEach(function (x) {
                x.kingCount = 0;x.isThumbMaster = false;
            });
        }
    }, {
        key: 'cardCount',
        get: function get() {
            return this.cards.length;
        }
    }, {
        key: 'kingCount',
        get: function get() {
            return this.cards.filter(function (x) {
                return x.number === 'K';
            }).length;
        }
    }, {
        key: 'userCount',
        get: function get() {
            return this.users.length;
        }
    }, {
        key: 'currentUserTurn',
        get: function get() {
            return this.users[0];
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _http = __webpack_require__(1);

var _http2 = _interopRequireDefault(_http);

var _server = __webpack_require__(6);

var _server2 = _interopRequireDefault(_server);

var _user = __webpack_require__(9);

var _user2 = _interopRequireDefault(_user);

var _deck = __webpack_require__(0);

var _deck2 = _interopRequireDefault(_deck);

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _gameList = __webpack_require__(10);

var _gameList2 = _interopRequireDefault(_gameList);

var _rules = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpServer = _http2.default.createServer(_server2.default);
var io = __webpack_require__(2)(httpServer);

var currentApp = _server2.default;

var defaultGameName = 'Default Game';
var gameList = new _gameList2.default();

io.on('connection', function (socket) {
    console.log(socket.id + ' connected');

    socket.on('usernameSelected', function (username) {
        if (username) {
            socket.username = username;
            socket.user = new _user2.default(username);
            console.log(socket.id + ' created user');
            io.emit('userConnected', {
                id: username
            });
        }
    });

    socket.on('joinGame', function (gameId) {
        var game = gameList.getGame(defaultGameName);
        socket.gameId = game.id;
        game.addUser(socket.user);
        socket.join(defaultGameName);
        io.to(defaultGameName).emit('userJoinedGame', {
            joinedUser: socket.user,
            gameId: game.id,
            currentUserTurn: game.currentUserTurn,
            users: game.users,
            cardCount: game.cardCount,
            kingCount: game.kingCount
        });
    });

    socket.on('pickCard', function () {
        console.log(socket.id + ' picked up card');
        var game = gameList.getGame(socket.gameId);
        var pickedCard = game.userPickCard(socket.user.id);
        if (pickedCard) {
            console.log(socket.id + ' picked ' + pickedCard.number + ' ' + pickedCard.suit);
            var nextUserTurn = game.nextUserTurn();
            console.log(nextUserTurn + ' has current turn');
            var rule = _rules.rules.get(pickedCard.number);

            io.to(game.id).emit('userPickedCard', {
                user: socket.user,
                users: game.users,
                card: pickedCard,
                nextUserTurn: nextUserTurn,
                rule: rule,
                cardCount: game.cardCount,
                kingCount: game.kingCount
            });
        }
    });

    socket.on('reshuffle', function () {
        console.log(socket.gameId + ' reshuffled');
        var game = gameList.getGame(socket.gameId);
        game.reshuffle();
        io.to(game.id).emit('reshuffled', {
            cardCount: game.cardCount,
            kingCount: game.kingCount,
            currentUserTurn: game.currentUserTurn
        });
    });

    socket.on('disconnect', function (reason) {
        console.log(socket.id + ' disconnected');
        var game = gameList.getGame(socket.gameId);
        game.removeUser(socket.username);
        io.emit('userDisconnected', {
            userId: socket.username,
            users: game.users,
            currentUserTurn: game.currentUserTurn
        });
    });
});

httpServer.listen(3000);

if (false) {
    module.hot.accept('./server', function () {
        httpServer.removeListener('request', currentApp);
        httpServer.on('request', _server2.default);
        currentApp = _server2.default;
    });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
var path = __webpack_require__(7);
var express = __webpack_require__(8);
var server = express();
var http = __webpack_require__(1).Server(server);

var PublicPath = '.dist';

var io = __webpack_require__(2)(http, {
    origins: ['*']
});

server.use(express.static('.dist'));

server.get('/', function (req, res) {
    res.sendFile(path.join(PublicPath, 'index.html'));
});

server.get('/api', function (req, res) {
    res.send({
        message: '__dirname: ' + __dirname
    });
});

exports.default = server;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(id) {
    _classCallCheck(this, User);

    this.id = id;
    this.kingCount = 0;
    this.isThumbMaster = false;
};

exports.default = User;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(3);

var _game2 = _interopRequireDefault(_game);

var _deck = __webpack_require__(0);

var _deck2 = _interopRequireDefault(_deck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameList = function () {
    function GameList(games) {
        _classCallCheck(this, GameList);

        this.games = games || [];
    }

    _createClass(GameList, [{
        key: 'getGame',
        value: function getGame(gameId) {
            var game = this.games.find(function (x) {
                return x.id === gameId;
            });
            if (!game) {
                game = new _game2.default(gameId);
                this.games.push(game);
            }

            return game;
        }
    }]);

    return GameList;
}();

exports.default = GameList;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var rules = new Map([['A', {
    title: 'Waterfall',
    description: 'Everyone must keep drinking until the person who picked the card stops.'
}], ['2', {
    title: 'Choose',
    description: 'Choose someone to drink.'
}], ['3', {
    title: 'Me',
    description: 'You must drink.'
}], ['4', {
    title: 'Floor',
    description: 'Last one to touch the floor must drink.'
}], ['5', {
    title: 'Thumb Master',
    description: 'When you put your thumb on the table everyone must follow, whomever is last must drink.'
}], ['6', {
    title: 'Dunno lol',
    description: 'Dunno lol'
}], ['7', {
    title: 'Heaven',
    description: 'Last one to point to the sky must drink'
}], ['8', {
    title: 'Mate',
    description: 'Choose someone to drink with you'
}], ['9', {
    title: 'Rhyme',
    description: 'Choose a sentence and the next person must match that sentence with a rhyme, move on to the next person until someone fails to make a rhyme. Whoever fails must drink.'
}], ['10', {
    title: 'Categories',
    description: 'Pick a category and the next person must match a word in that topic, move on to the next person until someone fails to match a category. Whoever fails must drink.'
}], ['J', {
    title: 'Make a Rule',
    description: 'Make up a rule that everyone has to obey, anyone who fails to follow the rule must drink.'
}], ['Q', {
    title: 'Question Master',
    description: 'Anyone who answers your question must drink, this rule is only valid until someone else becomes question master.'
}], ['K', {
    title: 'King',
    description: 'You must pour your drink into the communal pint, last person to pick the King card must drink the communal pint.'
}]]);

exports.rules = rules;

/***/ })
/******/ ]);