import { Author } from "../entity/Authors/authors.schema"
import { dbConnection } from "./dbconnection"

export class Database{
  async createAuthor(id:string ,name: string, sex: string) {
    const [, , Authors, , ] = dbConnection()

    const author = Authors.build({ 
      id: id,
      name: name, 
      sex: sex 
    });
    author.save()

    const authorModel = new Author()
    authorModel.id = author.getDataValue('id')
    authorModel.name = author.getDataValue('name')
    authorModel.sex = author.getDataValue('sex')
    authorModel.movies = author.getDataValue('movies')
    return authorModel
  }

  async getAuthors():Promise<Author []> {
    const [Movies, Actors, Authors, , ] = dbConnection()

    const users = await Authors.findAll({
      include: [
        {
          model: Movies,
          include: [Authors, Actors] 
        }
      ]
    })
    const authors = []
    for(const data of users){
      const author = new Author()
      author.id = data.getDataValue('id')
      author.name = data.getDataValue('name')
      author.sex = data.getDataValue('sex')
      author.movies = data.getDataValue('movies')
      authors.push(author)
    }
    return authors
  }

  async getAuthor(id: string) {
    const [Movies, Actors, Authors, , ] = dbConnection()
    
    const user = await Authors.findByPk(id, {
      include: [
        {
          model: Movies,
          include: [Authors, Actors] 
        }
      ]
    })
    if (user === null) {
      return Error("Cannot find user with this uid")
    }
    const author = new Author()
    author.id = user?.getDataValue('id') ?? false
    author.name = user?.getDataValue('name') ?? false
    author.sex = user?.getDataValue('sex') ?? false
    author.movies = user?.getDataValue('movies') ?? false
    return author
  }

  async deleteAuthor(id: string) {
    const [Movies, Actors, Authors, , Writes] = dbConnection()

    const user = await Authors.findByPk(id, {
      include: [
        {
          model: Movies,
          include: [Authors, Actors] 
        }
      ]
    })
    const author = new Author()
    author.id = user?.getDataValue('id') ?? false
    author.name = user?.getDataValue('name') ?? false
    author.sex = user?.getDataValue('sex') ?? false
    author.movies = user?.getDataValue('movies') ?? false
    
    await Authors.destroy({
      where: {
        id: id
      }
    });
    
    await Writes.destroy({
      where: {
        actorId: id
      }
    })

    return author
  }

  async updateAuthor(id: string, name: string, sex: string) {
    const [Movies, Actors, Authors, , ] = dbConnection()
    const user = await Authors.findByPk(id, {
      include: [
        {
          model: Movies,
          include: [Authors, Actors] 
        }
      ]
    })
    
    if (user === null){
      return Error("Cannot find user with this uid")
    }
    if(typeof name !== undefined){
      user.setDataValue('name', name)
    }
    if(typeof sex !== undefined){
      user.setDataValue('sex', sex)
    }

    const author = new Author()
    author.id = user?.getDataValue('id') ?? false
    author.name = user?.getDataValue('name') ?? false
    author.sex = user?.getDataValue('sex') ?? false
    author.movies = user?.getDataValue('movies') ?? false
    
    return author
  }
}