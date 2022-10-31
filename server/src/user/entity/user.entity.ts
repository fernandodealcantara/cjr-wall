import { User } from "@prisma/client";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UserEntity implements User {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    picture: string;

    @IsString()
    currentRefreshToken: string;
}