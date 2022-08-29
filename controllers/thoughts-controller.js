const { Thoughts, User } = require('../models')

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .then(dbThoughtData => {
                //if no user send a 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! ' })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            })
    },

    createThought({ body }, res) {
        Thoughts.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { _id: body.id },
                    { $push: { thoughts: dbThoughtData._id }},
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: ' thought create, no user with this id'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(500).json(err));
    })
}

}