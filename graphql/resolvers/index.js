const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');



const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                creator: user.bind(this, event.creator),
                date: new Date(event._doc.date).toISOString(),
            }
        });
    }
    catch (err) {
        throw err;
    };
};

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return { ...user._doc, _id: user.id, password: null, createdEvents: events.bind(this, user._doc.createdEvents) };
    }
    catch (err) {
        throw err;
    };
};

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return {
                    ...event._doc, _id: event.id, creator: user.bind(this, event._doc.creator), date: new Date(event._doc.date).toISOString(),
                };
            })
        }
        catch (err) {
            throw err;
        };
    },
    createEvent: async (args) => {
        const event =
            new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5d26c2570e2fe503c5bb569a'
            });
        try {
            let createdEvent;
            const result = await event.save()
            createdEvent = {
                ...result._doc, _id: event.id, creator: user.bind(this, event._doc.creator), date: new Date(event._doc.date).toISOString(),
            };
            const creator = await User.findById('5d26c2570e2fe503c5bb569a');
            if (!creator) {
                throw new Error('User Doesn\'t Exsist Already');
            } else {
                creator.createdEvents.push(event);
                await creator.save();
            }
            return createdEvent;
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    },
    createUser: async (args) => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('User Exsist Already');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);


            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            });
            const result = await user.save();
            return { ...result._doc, _id: result.id, password: null }
        }
        catch (err) {
            console.log(err);
            throw err;
        };
    }
}