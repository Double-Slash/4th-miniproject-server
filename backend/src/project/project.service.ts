import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { ProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  /* Update the Project */
  async create(projectDto: ProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(projectDto);
    return createdProject.save();
  }

  /* Find all of the Project */
  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  /* Find one of the Project */
  async findOne(title: string): Promise<Project> {
    return this.projectModel.findOne({ title: title }).exec();
  }

  /* Only find the Project Icon url  */
  async findUrls(): Promise<Project[]> {
    return this.projectModel.find({}, { iconUrl: 1 }).exec();
  }
}
