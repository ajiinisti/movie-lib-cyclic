import { dbConnection } from "./dbconnection"
import { Actor } from "../entity/Actors/actors.schema"

export class Database{
  async createActor(id:string ,name: string, activeyear:number, sex: string) {
    const [, Actors, , , ] = dbConnection()

    const actor = Actors.build({ 
      id: id,
      name: name, 
      activeyear: activeyear,
      sex: sex 
    });
    actor.save()

    const actorModel = new Actor()
    actorModel.id = actor.getDataValue('id')
    actorModel.name = actor.getDataValue('name')
    actorModel.activeyear = actor.getDataValue('activeyear')
    actorModel.sex = actor.getDataValue('sex')
    actorModel.movies = actor.getDataValue('movies')
    return actorModel
  }

  async getActors() {
    const [Movies, Actors, Authors, , ] = dbConnection()

    const users = await Actors.findAll({
      include: [
        {
          model: Movies,
          include: [Authors, Actors] 
        }
      ]
    })
    const actors = []
    for(const data of users){
        const actor = new Actor()
        actor.id = data.getDataValue('id')
        actor.name = data.getDataValue('name')
        actor.activeyear = data.getDataValue('activeyear')
        actor.sex = data.getDataValue('sex')
        actor.movies = data.getDataValue('movies')
        actors.push(actor)
    }
    return actors
  }

  async getActor(id: string) {
    const [Movies, Actors, , , ] = dbConnection()
    
    const user = await Actors.findByPk(id, {include: Movies})
    if (user === null) {
      return Error("Cannot find actor by pk with this uid")
    }
    const actor = new Actor()
    actor.id = user?.getDataValue('id') ?? false
    actor.name = user?.getDataValue('name') ?? false
    actor.activeyear = user?.getDataValue('activeyear') ?? false
    actor.sex = user?.getDataValue('sex') ?? false
    actor.movies = user?.getDataValue('movies') ?? false
    return actor
  }

  async deleteActor(id: string) {
    const [Movies, Actors, Authors, Plays, ] = dbConnection()

    const user = await Actors.findByPk(id, {
      include: [
        {
          model: Movies,
          include: [Authors, Actors] 
        }
      ]
    })
    if (user === null) {
      return Error("Cannot find actor with this uid")
    }
    const actor = new Actor()
    actor.id = user?.getDataValue('id') ?? false
    actor.name = user?.getDataValue('name') ?? false
    actor.activeyear = user?.getDataValue('activeyear') ?? false
    actor.sex = user?.getDataValue('sex') ?? false
    actor.movies = user?.getDataValue('movies') ?? false
    
    await Actors.destroy({
      where: {
        id: id
      }
    });

    await Plays.destroy({
      where: {
        actorId: id
      }
    })
    
    return actor
  }

  async updateActor(id: string, name: string, sex: string, activeyear: number) {
    const [Movies, Actors, Authors, , ] = dbConnection()
    const user = await Actors.findByPk(id, {
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
    if(typeof name !== undefined){
      user.setDataValue('activeyear', activeyear)
    }
    if(typeof activeyear !== undefined){
      user.setDataValue('sex', sex)
    }

    const actor = new Actor()
    actor.id = user?.getDataValue('id') ?? false
    actor.name = user?.getDataValue('name') ?? false
    actor.activeyear = user?.getDataValue('activeyear') ?? false
    actor.sex = user?.getDataValue('sex') ?? false
    actor.movies = user?.getDataValue('movies') ?? false
    
    return actor
  }
}