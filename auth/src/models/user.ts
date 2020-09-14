import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface userAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttrs): UserDoc
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        versionKey: false
    }
});

//Burada arrow function bilerek kullanmıyoruz. Çünkü this kullanıldığında,
//arrow function'da bu dosyası işaret eder. async function dediğimizde ise 
//gelen user parametresini gösteriyor.
userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }

    done();
});

//Typescript mongoDB üzerindeki property'lerin ne olduğunu bilemez.
//Type safe kod yazabilmek için new User(...) şeklinde bir tanımlama yerine
//Aşağıdaki buildUser metodu ile typescript'in user property'lerini kontrol edebilmesini sağlıyoruz.
// Udemy Microservices with NodeJS and React 138. video 
userSchema.statics.build = (attrs: userAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };