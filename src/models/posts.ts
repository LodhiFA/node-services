import { getModelForClass, mongoose } from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose/lib/prop';

class like {
    @prop({ ref: 'user' })
    public user!: mongoose.Schema.Types.ObjectId;
}

class comment {
    @prop({ ref: 'user' })
    public user!: mongoose.Schema.Types.ObjectId;
    
    @prop({ required: true })
    public text!: string;
    
    @prop()
    public name!: string;
    
    @prop()
    public avatar!: string;
    
    @prop({ default: Date.now })
    public date!: Date;
}

class post {
    @prop({ ref: 'user' })
    public user!: mongoose.Schema.Types.ObjectId;

    @prop({ required: true })
    public text!: string;
    
    @prop()
    public name!: string;
    
    @prop()
    public avatar!: string;
    
    @prop({ type: [like] })
    public likes!: like[];
    
    @prop({ type: [comment] })
    public comments!: comment[];
    
    @prop({ default: Date.now })
    public date!: Date;
}

export const Post = getModelForClass(post);