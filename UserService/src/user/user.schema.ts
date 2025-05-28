import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as MongooseSchema } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
    @Prop({ type: String, unique: true, required: true })
    email: string

    @Prop({ type: String })
    name: string
}

export const UserSchema = SchemaFactory.createForClass(User)