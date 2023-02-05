import { Field, ObjectType } from "type-graphql"
import { Movie } from "../Movies/movies.schema"
import 'reflect-metadata'

@ObjectType()
export class Actor {
    @Field()
    id!: string
    @Field({ description: "The name of the actor" })
    name!: string
    @Field({ description: "Actor's debut movie release date" })
    activeyear!: number
    @Field()
    sex!: string
    @Field(() => [Movie])
    movies: Movie[] | undefined;
}