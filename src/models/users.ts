import { getModelForClass, modelOptions } from '@typegoose/typegoose'
import { prop } from '@typegoose/typegoose/lib/prop'

@modelOptions({ schemaOptions: { collection: 'users' } })
class user {
    @prop({ required: true })
    public name!: string
    
    @prop({ required: true, unique: true })
    public email!: string
    
    @prop({ required: true })
    public password!: string
    
    @prop()
    public avatar!: string
    
    @prop({ default: Date.now })
    public date!: Date
}

export const User = getModelForClass(user)