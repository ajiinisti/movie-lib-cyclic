import "reflect-metadata"
import { buildSchema } from "type-graphql"
import express from "express"
import { graphqlHTTP } from "express-graphql"
import { ActorResolver } from "./entity/Actors/actors.resolvers"
import { AuthorResolver } from "./entity/Authors/authors.resolvers"
import { MovieResolver } from "./entity/Movies/movies.resolvers"
import dotenv from "dotenv"

dotenv.config()
async function main() {
    const schema = await buildSchema({
        resolvers: [ActorResolver, AuthorResolver, MovieResolver],
        emitSchemaFile: true,
    })

    const app = express()

    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: false,
        })
    )

    app.use(
        "/graphiql",
        graphqlHTTP({
            schema: schema,
            graphiql: true,
        })
    )

    app.listen(process.env.PORT)
    console.log(`Running a GraphQL API server at http://localhost:${process.env.PORT}/graphql`)
}

main()