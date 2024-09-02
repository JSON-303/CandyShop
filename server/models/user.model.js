import { model, Schema } from 'mongoose';
import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "A userName is required."],
            minLength: [1, "Username must be at least one (1) character in length."],
            maxLength: [20, "Username can not exceed twenty (20) characters in length."]
        },

        firstName: {
            type: String,
            required: [true, "Please enter your first name."]
        },

        lastName: {
            type: String,
            required: [true, "Please enter your last name."]
        },

        email: {
            type: String,
            required: [true, "An email address is required."],
            lowercase: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Please provide a valid email address'
            ]
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minLength: [8, "Password must be at least eight (8) characters long."]
        },

        address: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
                maxLength: [2, "State code must be two (2) characters."], 
                uppercase: true,
            },
            zip: {
                type: String,
                match: [/^\d{5}(-\d{4})?$/, "Please provide a valid zip code."]
            }
        }
    },
    { timestamps: true }
);

UserSchema.virtual("confirmPassword")
    .get(function () { return this._confirmPassword })
    .set(function (value) { this._confirmPassword = value });

UserSchema.pre("validate", function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match Confirm Password.");
    }
    next();
});

UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;
            next();
        });
});

const UserModel = model("User", UserSchema);
export default UserModel;
