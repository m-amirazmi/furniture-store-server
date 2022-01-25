import { Document } from "mongoose";

export interface ICategoryDoc extends Document {
	name: string;
}
