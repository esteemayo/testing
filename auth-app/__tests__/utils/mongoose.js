import mongoose from 'mongoose';

export const connect = () => mongoose.connect('mongodb://localhost:27017/auth-app_test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

export const disconnect = () => mongoose.connection.close();