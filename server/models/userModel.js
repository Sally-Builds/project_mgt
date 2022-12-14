const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ProjectAssign = require('./projectAssignmentModel')

const userSchema = new mongoose.Schema({
  regNO: {
    type: String,
    unique: true,
    sparse: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  staffID: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm password'],
    validate: {
      validator: function(confirmPassword){
        return confirmPassword === this.password
      },
      message: 'Password does not match'
    }
  },
  role: {
    type: String,
    required: [true, 'You must have a role'],
    enum: ['student', 'admin', 'lecturer'],
    default: 'user'
  },
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

//encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
  next();
});

//function to compare password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword)
}

//get the current timestamp of when the password was changed
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if(this.role === 'lecturer') {
    await ProjectAssign.create({supervisor: this.id})
  }
  next();
});

//password changed after
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  //False means not changed
  return false;
};

//user deleted account
userSchema.pre(/^find/, function(next) {
  this.find({active: {$ne : false} })
  next()
})

userSchema.virtual('projects', {
  foreignField: 'student',
  localField: "_id",
  ref: 'Project'
})

userSchema.pre(/^find/, function (next) {
  this.populate('projects')
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
