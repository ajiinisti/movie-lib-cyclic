import { Field, ObjectType } from "type-graphql"
import { Actor } from "../Actors/actors.schema"
import { Author } from "../Authors/authors.schema"
import 'reflect-metadata'

@ObjectType()
export class Movie {
    @Field()
    id!: string
    @Field({ description: "Title of the Movie" })
    title!: string
    @Field({ description: "Released year of the Movie" })
    releaseyear!: number
    @Field({ description: "IMDb rating of the Movie" })
    rating!: number
    @Field({ description: "Genre that describe movie plot" })
    genre!: string
    @Field(() => [Actor], { nullable: true })
    actors: Actor[] | undefined;
    @Field(() => [Author], { nullable: true })
    authors: Author[] | undefined;
}