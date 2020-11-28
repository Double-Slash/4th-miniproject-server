import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from '../schemas/review.schema';
import { ReviewDto } from '../dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  /* Update the Review */
  async create(reviewDto: ReviewDto): Promise<Review> {
    const createdReview = new this.reviewModel(reviewDto);
    return createdReview.save();
  }

  /* Find all of the Review */
  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }
}
