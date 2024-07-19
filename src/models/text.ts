import mongoose, { Document, Schema } from 'mongoose';

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI || 'undefined url';

console.log('URI in env is', process.env.MONGODB_URI);

console.log('connecting to', url);

mongoose.connect(url)
    .then(result => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection error:', error));

interface IPText extends Document {
    name: string;
    content: string;
}

const textSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        minLength: 2,
        required: true,
    },
});

textSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Text = mongoose.model<IPText>('Text', textSchema);
export default Text;