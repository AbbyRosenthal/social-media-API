//imports parts of mongoose we need
const { Schema, model } = require('mongoose');

const UserSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        //MONGOOSE EMAIL VALIDATION
        //match: 
    },
    thoughts: [
        {
            //telling mongoose the thought comes fromt the thoughts model
            type: Schema.Types.ObjectId,
            //telling the user model which document to search
            ref: 'Thoughts'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
//telling the schema it can use virutals
toJSON: {
    virtuals: true,
},
id: false
});

//CREATE A VIRTUAL CALLED FRIEND COUNT THAT RETRIEVES LENGTH OF USERS FRIENDS ON QUERY
//virtual for friend count
UserSchema.virtual('friendCount').get(function () {
return this.friends.length;
});

//create the User model using the UserSchema
const User = model('User', UserSchema);

//export user mdoel
module.export = User;