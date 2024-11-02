import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";

export interface IMessage extends Document {
  sender: IUser;
  recipient: IUser;
  content: string;
  timestamp: Date;
}

const messageSchema: Schema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;
