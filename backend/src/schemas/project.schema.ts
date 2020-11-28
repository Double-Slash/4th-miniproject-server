import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MemberDto } from '../dto/member.dto';

export type ProjectDocument = Project & Document;

/* Project DB */
@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  members: MemberDto[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  service: string[];

  @Prop()
  iconUrl: string;

  @Prop()
  projectDataUrl: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
