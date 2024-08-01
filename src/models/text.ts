import mongoose, { Document, Schema } from 'mongoose';

// Interface for text document
interface IPText extends Document {
    name: string;
    content: string;
}

// Text schema to ensure correct format
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