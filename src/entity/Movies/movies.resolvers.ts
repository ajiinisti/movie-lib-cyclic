import { Query, Resolver, Mutation, Arg } from "type-graphql"
import { Movie } from "./movies.schema"
import { Database } from "../../model/moviemodel"
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => Movie)
export class MovieResolver {
    private db = new Database()

    @Query(() => [Movie])
    async getMovies(): Promise<Movie[]> {
        return this.db.getMovies()
    }

    @Query(() => Movie)
    async getMovie(@Arg("id") id: string): Promise<Movie|Error> {
        return this.db.getMovie(id)
    }

    @Mutation(() => Movie)
    async createMovie(
        @Arg("title") title: string, 
        @Arg("releaseyear") releaseyear: number, 
        @Arg("rating") rating: number, 
        @Arg("genre") genre: string
        ): Promise<Movie> {
        return this.db.createMovie(uuidv4() ,title, releaseyear, rating, genre)
    }

    @Mutation(() => Movie)
    async deleteMovie(
        @Arg("id") id: string
        ): Promise<Movie|Error> {
        return this.db.deleteMovie(id)
    }

    @Mutation(() => Movie)
    async updateMovie(
        @Arg("id") id: string,
        @Arg("title") title: string, 
        @Arg("releaseyear") releaseyear: number, 
        @Arg("rating") rating: number, 
        @Arg("genre") genre: string
    ): Promise<Movie|Error> {
        return this.db.updateMovie(id, title, releaseyear, rating, genre)
    }

    @Mutation(() => Movie)
    async updateActorInMovie(
        @Arg("movieId") movieId: string,
        @Arg("actorId") actorId: string 
    ): Promise<Movie|Error> {
        return this.db.updateActorInMovie(movieId, actorId)
    }

    @Mutation(() => Movie)
    async updateAuthorInMovie(
        @Arg("movieId") movieId: string,
        @Arg("authorId") authorId: string 
    ): Promise<Movie|Error> {
        return this.db.updateAuthorInMovie(movieId, authorId)
    }
}