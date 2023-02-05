import { AuthorResolver } from "../../entity/Authors/authors.resolvers"
import { Author } from "../../entity/Authors/authors.schema"

describe("author resolver test",() => {
    it("Should create an author", () => {
        const data = new Author()
        data.name = "wijaya"
        data.sex = "M"

        const authorResolver= new AuthorResolver()
        authorResolver.createAuthor(data.name, data.sex).then((response) => {
            expect(response.name).toEqual(data.name)
            expect(response.sex).toEqual(data.sex)
        })
    })

    it("Should get all author", () => {
        const data = new Author()
        data.name = "wijaya"
        data.sex = "M"

        const data2 = new Author()
        data2.name = "inisti"
        data2.sex = "F"

        const arrayOfAuthors:Author [] = [data,data2]

        const authorResolver= new AuthorResolver()
        authorResolver.createAuthor(data.name, data.sex)
        authorResolver.createAuthor(data2.name, data2.sex)

        authorResolver.getAuthors().then((response) => {
            for(let i=0; i< response.length; i++){
                expect(response[i].name).toEqual(arrayOfAuthors[i].name)
                expect(response[i].sex).toEqual(arrayOfAuthors[i].sex)
            }
        })
    })

    describe("get author by pk", () => {
        it("Should return author", () => {
            const data = new Author()
            data.name = "wijaya"
            data.sex = "M"
    
            const authorResolver= new AuthorResolver()
            authorResolver.createAuthor(data.name, data.sex).then((response) => {
                authorResolver.getAuthor(response.id).then((response2) => {
                    expect(response2.id).toEqual(response.id)
                })
            })
        })
        it("Should return error", () => {
            const authorResolver= new AuthorResolver()
            authorResolver.getAuthor("7868d025-dd69-4e1e-927c-0c16441c675f").then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })

    describe("delete author by pk", () => {
        it("Should return author", () => {
            const data = new Author()
            data.name = "wijaya"
            data.sex = "M"
    
            const authorResolver= new AuthorResolver()
            authorResolver.createAuthor(data.name, data.sex).then((response) => {
                authorResolver.deleteAuthor(response.id).then((response2) => {
                    expect(response2.id).toEqual(response.id)
                })
            })
        })
        it("Should return error", () => {
            const authorResolver= new AuthorResolver()
            authorResolver.deleteAuthor("7868d025-dd69-4e1e-927c-0c16441c675f").then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })

    describe("update author", () => {
        it("Should return author", () => {
            const data = new Author()
            data.name = "wijaya"
            data.sex = "M"
    
            const authorResolver= new AuthorResolver()
            authorResolver.createAuthor(data.name, data.sex).then((response) => {
                authorResolver.updateAuthor(response.id, "inisti", "F").then((response2) => {
                    expect(response2.id).toEqual(response.id)
                    expect(response2.name).toEqual("inisti")
                    expect(response2.activeyear).toEqual(2012)
                    expect(response2.sex).toEqual("F")
                })
            })
        })
        it("Should return error", () => {
            const data = new Author()
            data.name = "wijaya"
            data.sex = "M"
    
            const authorResolver= new AuthorResolver()
            authorResolver.updateAuthor("7868d025-dd69-4e1e-927c-0c16441c675f", data.name, data.sex).then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })
})