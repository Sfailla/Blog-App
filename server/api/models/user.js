const mongoose = require('mongoose')
const validator = require('validator')
const { ValidationError } = require('../middleware/utils/errors')
const { Schema, model } = mongoose

const typeProps = { trim: true, unique: true, index: true }
const requiredString = {
  type: String,
  required: [true, 'must provide field']
}

const validateEmail = {
  validator: value => {
    return validator.isEmail(value)
  },
  message: '{VALUE} is not a valid email address'
}

const UserSchema = new Schema(
  {
    username: { ...requiredString, ...typeProps },
    email: {
      ...requiredString,
      ...typeProps,
      lowercase: true,
      validate: validateEmail
    },
    password: { ...requiredString, trim: true },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user'
    },
    createdAt: { type: Date, default: Date.now }
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        delete ret._id
        delete ret.password
      }
    }
  }
)

UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new ValidationError(400, 'username or email already exists'))
  } else {
    next(error)
  }
})

module.exports = model('User', UserSchema)
