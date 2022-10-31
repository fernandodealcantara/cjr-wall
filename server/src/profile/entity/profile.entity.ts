import { Profile, Department } from "@prisma/client";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TransformDate } from "../decorators/transform-date.decorator";
import { TransformSetHttpsPrefix } from "../decorators/transform-link.decorator";

export class ProfileEntity implements Profile {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
  
  @IsEnum(Department)
  department: Department;

  @IsString()
  @TransformSetHttpsPrefix()
  instagram: string;

  @IsString()
  @TransformSetHttpsPrefix()
  linkedin: string;
  
  @IsString()
  @TransformSetHttpsPrefix()
  twitter: string;

  @IsString()
  @TransformSetHttpsPrefix()
  github: string;

  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDate()
  @TransformDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  @TransformDate()
  updatedAt: Date;
}