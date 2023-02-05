import { Query, Resolver, Mutation, Arg } from "type-graphql"
import { Author } from "./authors.schema"
import { Database } from "../../model/authormodel"
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => Author)
export class AuthorResolver {
    private db = new Database()

    @Query(() => [Author])
    async getAuthors(): Promise<Author[]> {
        return this.db.getAuthors()
    }

    @Query(() => Author)
    async getAuthor(@Arg("id") id: string): Promise<Author|Error> {
        return this.db.getAuthor(id)
    }

    @Mutation(() => Author)
    async createAuthor(@Arg("name") name: string, @Arg("sex") sex: string): Promise<Author> {
        return this.db.createAuthor(uuidv4() ,name, sex)
    }

    @Mutation(() => Author)
    async deleteAuthor(@Arg("id") id: string): Promise<Author> {
        return this.db.deleteAuthor(id)
    }

    @Mutation(() => Author)
    async updateAuthor(
        @Arg("id") id: string,
        @Arg("name") name: string,
        @Arg("sex") sex: string
    ): Promise<Author|Error> {
        return this.db.updateAuthor(id, name, sex)
    }

    // @Mutation(() => Author)
    // async updateAuthor(
    //     @Arg("id") id: string,
    //     @Arg("input") input: AuthorInput
    // ): Promise<Author|Error> {
    //     return this.db.updateAuthor(id, input.name, input.sex)
    // }
}