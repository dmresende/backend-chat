import mongoose, { Document, Schema } from "mongoose";

/* A interface para o seu modelo de usuário, especificando os 
tipos dos campos. extends Document é importante para que o TypeScript
 reconheça os métodos do Mongoose*/
interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  photo?: string;
}

//esquema do seu modelo
const userSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
    photo: { String },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
