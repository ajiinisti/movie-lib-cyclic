import { Movie } from "../entity/Movies/movies.schema"
import { dbConnection } from "./dbconnection"

export class Database{
  async createMovie(id:string ,title: string, releaseyear:number, rating: number, genre: string) {
    const [Movies, , , , ] = dbConnection()

    const movie = Movies.build({ 
      id: id,
      title: title, 
      releaseyear: releaseyear,
      rating: rating,
      genre: genre
    });
    movie.save()

    const movieModel = new Movie()
    movieModel.id = movie.getDataValue('id')
    movieModel.title = movie.getDataValue('title')
    movieModel.releaseyear = movie.getDataValue('releaseyear')
    movieModel.rating = movie.getDataValue('rating')
    movieModel.genre = movie.getDataValue('genre')
    movieModel.actors = movie.getDataValue('actors')
    movieModel.authors = movie.getDataValue('authors')
    return movieModel
  }

  async getMovies() {
    const [Movies, Actors, Authors, , ] = dbConnection()

    const users = await Movies.findAll({include: [{
      model: Actors
    }, {
        model: Authors
    }]})
    const movies = []
    for(const data of users){
      const movie = new Movie()
      movie.id = data.getDataValue('id')
      movie.title = data.getDataValue('title')
      movie.releaseyear = data.getDataValue('releaseyear')
      movie.rating = data.getDataValue('rating')
      movie.genre = data.getDataValue('genre')
      movie.actors = data.getDataValue('actors')
      movie.authors = data.getDataValue('authors')
      movies.push(movie)
    }
    return movies
  }

  async getMovie(id: string) {
    const [Movies, Actors, Authors, , ] = dbConnection()
    
    const user = await Movies.findByPk(id, {include: [{
      model: Actors
    }, {
      model: Authors
    }]})
    if (user === null) {
      return Error("Cannot find movie with this uid")
    }
    const movie = new Movie()
    movie.id = user.getDataValue('id')
    movie.title = user.getDataValue('title')
    movie.releaseyear = user.getDataValue('releaseyear')
    movie.rating = user.getDataValue('rating')
    movie.genre = user.getDataValue('genre')
    movie.actors = user.getDataValue('actors')
    movie.authors = user.getDataValue('authors')
    return movie
  }

  async deleteMovie(id: string) {
    const [Movies, Actors, Authors, , ] = dbConnection()

    const user = await Movies.findByPk(id, {include: [{
      model: Actors
    }, {
        model: Authors
    }]})
    if (user === null) {
      return Error("Cannot find movie with this uid")
    }
    const movie = new Movie()
    movie.id = user.getDataValue('id')
    movie.title = user.getDataValue('title')
    movie.releaseyear = user.getDataValue('releaseyear')
    movie.rating = user.getDataValue('rating')
    movie.genre = user.getDataValue('genre')
    movie.actors = user.getDataValue('actors')
    movie.authors = user.getDataValue('authors')
    
    await Movies.destroy({
      where: {
        id: id
      }
    });
    
    return movie
  }

  async updateMovie(id:string ,title: string, releaseyear:number, rating: number, genre: string) {
    const [Movies, Actors, Authors, , ] = dbConnection()
    const user = await Movies.findByPk(id, {include: [{
      model: Actors
    }, {
        model: Authors
    }]})
    
    if (user === null){
      return Error("Cannot find movie with this uid")
    }
    if(typeof title !== undefined){
      user.setDataValue('title', title)
    }
    if(typeof releaseyear !== undefined){
      user.setDataValue('releaseyear', releaseyear)
    }
    if(typeof rating !== undefined){
      user.setDataValue('rating', rating)
    }
    if(typeof genre !== undefined){
      user.setDataValue('genre', genre)
    }
    
    const movie = new Movie()
    movie.id = user.getDataValue('id')
    movie.title = user.getDataValue('title')
    movie.releaseyear = user.getDataValue('releaseyear')
    movie.rating = user.getDataValue('rating')
    movie.genre = user.getDataValue('genre')
    movie.actors = user.getDataValue('actors')
    movie.authors = user.getDataValue('authors')
    
    return movie
  }

  async updateActorInMovie(movieId: string, actorId: string) {
    const [Movies, Actors, Authors, Plays, ] = dbConnection()
    const user = await Movies.findByPk(movieId)
    if (user === null){
      return Error("Cannot find movie with this uid")
    }
    
    const actor = await Actors.findByPk(actorId)
    if (actor === null){
      return Error("Cannot find actor with this uid")
    }

    await Plays.create({
      movieId: movieId,
      actorId: actorId
    })
    
    const newMovies = await Movies.findByPk(movieId,{include: [{
      model: Actors
    }, {
        model: Authors
    }]})    
    const movie = new Movie()
    movie.id = newMovies?.getDataValue('id') ?? false
    movie.title = newMovies?.getDataValue('title') ?? false
    movie.releaseyear = newMovies?.getDataValue('releaseyear') ?? false
    movie.rating = newMovies?.getDataValue('rating') ?? false
    movie.genre = newMovies?.getDataValue('genre') ?? false
    movie.actors = newMovies?.getDataValue('actors') ?? false
    movie.authors = newMovies?.getDataValue('authors') ?? false
    
    return movie
  }

  async updateAuthorInMovie(movieId: string, authorId: string) {
    const [Movies, Actors, Authors, , Writes] = dbConnection()
    const user = await Movies.findByPk(movieId)
    if (user === null){
      return Error("Cannot find movie with this uid")
    }
    
    const actor = await Authors.findByPk(authorId)
    if (actor === null){
      return Error("Cannot find actor with this uid")
    }

    await Writes.create({
      movieId: movieId,
      authorId: authorId
    })
    
    const newMovies = await Movies.findByPk(movieId, {include: [{
      model: Actors
    }, {
        model: Authors
    }]})    
    const movie = new Movie()
    movie.id = newMovies?.getDataValue('id') ?? false
    movie.title = newMovies?.getDataValue('title') ?? false
    movie.releaseyear = newMovies?.getDataValue('releaseyear') ?? false
    movie.rating = newMovies?.getDataValue('rating') ?? false
    movie.genre = newMovies?.getDataValue('genre') ?? false
    movie.actors = newMovies?.getDataValue('actors') ?? false
    movie.authors = newMovies?.getDataValue('authors') ?? false
    
    return movie
  }
}