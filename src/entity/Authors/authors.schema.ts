import { Field, ObjectType } from "type-graphql"
import { Movie } from "../Movies/movies.schema"
import 'reflect-metadata'

@ObjectType()
export class Author {
    @Field()
    id!: string
    @Field({ description: "The name of the author" })
    name!: string
    @Field()
    sex!: string
    @Field(() => [Movie])
    movies: Movie[] | undefined;
}