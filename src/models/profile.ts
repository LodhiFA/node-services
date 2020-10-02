import { getModelForClass, mongoose, Ref } from '@typegoose/typegoose';
import { prop } from '@typegoose/typegoose/lib/prop';

class experience {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public company!: string;

  @prop()
  public location!: string;

  @prop({ required: true })
  public from!: Date;

  @prop()
  public to!: Date;

  @prop({ default: false })
  public current!: boolean;

  @prop()
  public description!: string;
}

class education {
  @prop({ required: true })
  public school!: string;

  @prop({ required: true })
  public degree!: string;

  @prop({ required: true })
  public fieldofstudy!: string;

  @prop({ required: true })
  public from!: Date;

  @prop()
  public to!: Date;

  @prop({ default: false })
  public current!: boolean;

  @prop()
  public description!: string;
}

class social {
  @prop()
  public youtube!: string;

  @prop()
  public twitter!: string;

  @prop()
  public facebook!: string;

  @prop()
  public linkedin!: string;

  @prop()
  public instagram!: string;
}

class profile {
  @prop({ ref: 'user' })
  public user!: mongoose.Schema.Types.ObjectId;

  @prop()
  public company!: string;

  @prop()
  public website!: string;

  @prop()
  public location!: string;

  @prop({ required: true })
  public status!: string;

  @prop({ required: true, type: [String] })
  public skills!: string[];

  @prop()
  public bio!: string;

  @prop()
  public githubusername!: string;

  @prop({ type: [experience] })
  public experience!: experience[];

  @prop({ type: [education] })
  public education!: education[];

  @prop()
  public social!: social;

  @prop({ default: Date.now })
  public date!: Date;
}

export const Profile = getModelForClass(profile);
