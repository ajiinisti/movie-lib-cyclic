import { MovieResolver } from "../../entity/Movies/movies.resolvers"
import { Movie } from "../../entity/Movies/movies.schema"

describe("movie resolver test",() => {
    it("Should create an movie", () => {
        const data = new Movie()
        data.title = "Harry Potter"
        data.releaseyear = 2013
        data.rating = 3.5
        data.genre = "Romance"

        const movieResolver= new MovieResolver()
        movieResolver.createMovie(data.title, data.releaseyear, data.rating, data.genre).then((response) => {
            expect(response.title).toEqual(data.title)
            expect(response.releaseyear).toEqual(data.releaseyear)
            expect(response.rating).toEqual(data.rating)
            expect(response.genre).toEqual(data.genre)
        })
    })

    it("Should get all movie", () => {
        const data = new Movie()
        data.title = "Harry Potter"
        data.releaseyear = 2013
        data.rating = 3.5
        data.genre = "Romance"

        const data2 = new Movie()
        data2.title = "Harry Potter 2"
        data2.releaseyear = 20115
        data2.rating = 4.0
        data2.genre = "Romance"

        const arrayOfMovies:Movie [] = [data,data2]

        const movieResolver= new MovieResolver()
        movieResolver.createMovie(data.title, data.releaseyear, data.rating, data.genre)
        movieResolver.createMovie(data2.title, data2.releaseyear, data2.rating, data2.genre)

        movieResolver.getMovies().then((response) => {
            for(let i=0; i< response.length; i++){
                expect(response[i].title).toEqual(arrayOfMovies[i].title)
                expect(response[i].releaseyear).toEqual(arrayOfMovies[i].releaseyear)
                expect(response[i].rating).toEqual(arrayOfMovies[i].rating)
                expect(response[i].genre).toEqual(arrayOfMovies[i].genre)
            }
        })
    })

    describe("get movie by pk", () => {
        it("Should return movie", () => {
            const data = new Movie()
            data.title = "Harry Potter"
            data.releaseyear = 2013
            data.rating = 3.5
            data.genre = "Romance"
    
            const movieResolver= new MovieResolver()
            movieResolver.createMovie(data.title, data.releaseyear, data.rating, data.genre).then((response) => {
                movieResolver.getMovie(response.id).then((response2) => {
                    expect(response2.id).toEqual(response.id)
                })
            })
        })
        it("Should return error", () => {
            const movieResolver= new MovieResolver()
            movieResolver.getMovie("7868d025-dd69-4e1e-927c-0c16441c675f").then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })

    describe("delete movie by pk", () => {
        it("Should return movie", () => {
            const data = new Movie()
            data.title = "Harry Potter"
            data.releaseyear = 2013
            data.rating = 3.5
            data.genre = "Romance"
    
            const movieResolver= new MovieResolver()
            movieResolver.createMovie(data.title, data.releaseyear, data.rating, data.genre).then((response) => {
                movieResolver.deleteMovie(response.id).then((response2) => {
                    expect(response2.id).toEqual(response.id)
                })
            })
        })
        it("Should return error", () => {
            const movieResolver= new MovieResolver()
            movieResolver.deleteMovie("7868d025-dd69-4e1e-927c-0c16441c675f").then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })

    describe("update movie", () => {
        it("Should return movie", () => {
            const data = new Movie()
            data.title = "Harry Potter"
            data.releaseyear = 2013
            data.rating = 3.5
            data.genre = "Romance"
    
            const movieResolver= new MovieResolver()
            movieResolver.createMovie(data.title, data.releaseyear, data.rating, data.genre).then((response) => {
                movieResolver.updateMovie(response.id, "IP MAN", 2002, 4.5, "Adventure").then((response2) => {
                    expect(response2.id).toEqual(response.id)
                    expect(response2.title).toEqual("IP MAN")
                    expect(response2.releaseyear).toEqual(2002)
                    expect(response2.rating).toEqual(4.5)
                    expect(response2.genre).toEqual("Adventure")
                })
            })
        })
        it("Should return error", () => {
            const data = new Movie()
            data.title = "Harry Potter"
            data.releaseyear = 2013
            data.rating = 3.5
            data.genre = "Romance"
    
            const movieResolver= new MovieResolver()
            movieResolver.updateMovie("7868d025-dd69-4e1e-927c-0c16441c675f", data.title, data.releaseyear, data.rating, data.genre).then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })
})