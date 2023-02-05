import { Query, Resolver, Mutation, Arg } from "type-graphql"
import { Actor } from "./actors.schema"
import { Database } from "../../model/actormodel"
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => Actor)
export class ActorResolver {
    private db = new Database()

    @Query(() => [Actor])
    async getActors(): Promise<Actor[]> {
        return this.db.getActors()
    }

    @Query(() => Actor)
    async getActor(@Arg("id") id: string): Promise<Actor|Error> {
        return this.db.getActor(id)
    }

    @Mutation(() => Actor)
    async createActor(@Arg("name") name: string, @Arg("sex") sex: string, @Arg("activeyear") activeyear: number): Promise<Actor> {
        return this.db.createActor(uuidv4() ,name, activeyear, sex)
    }

    @Mutation(() => Actor)
    async deleteActor(@Arg("id") id: string): Promise<Actor|Error> {
        return this.db.deleteActor(id)
    }

    @Mutation(() => Actor)
    async updateActor(
        @Arg("id") id: string,
        @Arg("name") name: string,
        @Arg("sex") sex: string,
        @Arg("activeyear") activeyear: number,
    ): Promise<Actor|Error> {
        return this.db.updateActor(id, name, sex, activeyear)
    }
}