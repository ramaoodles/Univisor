var softDelete = require('mongoose-softdelete');
var timestamps = require('mongoose-timestamp');
 var UserSchema = new mongooseSchema({
	firstName: {
		type: String,
		default: '',
		required: true,
		trim: true,
        validate: [stringNotNull, "First name is required."]
	}, 
    lastName: {
		type: String,
		default: '',
		required: true,
		trim: true
	},
    email: {
		type: String,
		default: '',
		required: true,
		trim: true,
        unique: true
	},
    password: {
		type: String,
		default: '',
		required: true,
		trim: true
	},
    salt:{
        type:String,
        default:'',
        required:true,
        trim:true
    },
    accountLocked:{
        type:Boolean,
        default:true,
        required:true,
        trim:true
    },
    isAccountActive:{
        type:Boolean,
        default:false,
        required:true,
        trim:true
    },
   created: {
		type: Date,
		default: Date.now
	},
    
});

UserSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

UserSchema.pre("save",function(next, done) {
    var self = this;
    mongoose.models["User"].findOne({email : self.email},function(err, results) {
        if(err) {
            done(err);
        } else if(results) { //there was a result found, so the email address exists
            self.invalidate("email","email must be unique");
            done(new Error("email must be unique"));
        } else {
            done();
        }
    });
    next();
});

UserSchema.plugin(timestamps);
UserSchema.plugin(softDelete);

//configuring different access level for the USER
UserSchema.plugin(require('mongoose-role'), {
  roles: configurationHolder.config.roles,
  accessLevels: configurationHolder.config.accessLevels
});

function stringNotNull(obj){
    return obj.length
}



var User = mongoose.model('User', UserSchema);
module.exports = User
