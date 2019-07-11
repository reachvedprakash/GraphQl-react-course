const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const Event = require('./models/event');
const User = require('./models/user');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolvers/index');

const app = express();
app.use(bodyParser.json());


// const events = eventIds => {
// 	console.log(eventIds);
// 	return Event.find({ _id: { $in: eventIds } })
// 		.then(events => {
// 			console.log(events);
// 			return events.map(event => {
// 				return { ...event._doc, _id: event.id, creator: user.bind(this, event.creator) }
// 			})
// 		})
// 		.catch(err => {
// 			throw err;
// 		});
// };

// const user = (userId) => {
// 	return User.findById(userId).then((user) => {
// 		return { ...user._doc, _id: user.id, password: null, createdEvents: events.bind(this, user._doc.createdEvents) };
// 	}).catch(err => {
// 		throw err;
// 	});
// };




// 5ZzZCjQi0eEllWc2
app.use('/graphql', graphqlHttp({
	schema: graphQlSchema,
	rootValue: graphQlResolver,
	graphiql: true
})
);

mongoose.connect(`mongodb+srv://ved:5ZzZCjQi0eEllWc2@cluster0-nnub9.mongodb.net/event-react-dev?retryWrites=true&w=majority`)
	.then(() => {
		app.listen(3000);
	}).catch(err => {
		console.log(err);
	});

