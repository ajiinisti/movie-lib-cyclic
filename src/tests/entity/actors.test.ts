import { ActorResolver } from "../../entity/Actors/actors.resolvers"
import { Actor } from "../../entity/Actors/actors.schema"

describe("actor resolver test",() => {
    // const SequelizeMock = require("sequelize-mock");
    // var dbMock = new SequelizeMock();
    // const userMock = dbMock.define('actor',{
    //         id: uuidv4(),
    //         name: "wijaya",
    //         activeyear: 2013,
    //         sex: "M"
    //     },{
    //         instanceMethods: {
    //             findAll: function (){
    //                 return this.
    //             }
    //         }
    //     }
    // )

    it("Should create an actor", () => {
        const data = new Actor()
        data.name = "wijaya"
        data.activeyear = 2013
        data.sex = "M"

        const actorResolver= new ActorResolver()
        actorResolver.createActor(data.name, data.sex, data.activeyear).then((response) => {
            expect(response.name).toEqual(data.name)
            expect(response.activeyear).toEqual(data.activeyear)
            expect(response.sex).toEqual(data.sex)
        })
    })

    it("Should get all actor", async () => {
        const data = new Actor()
        data.name = "wijaya"
        data.activeyear = 2013
        data.sex = "M"

        const data2 = new Actor()
        data2.name = "inisti"
        data2.activeyear = 2015
        data2.sex = "F"

        const arrayOfActors:Actor [] = [data,data2]

        const actorResolver= new ActorResolver()
        actorResolver.createActor(data.name, data.sex, data.activeyear)
        actorResolver.createActor(data2.name, data2.sex, data2.activeyear)
        actorResolver.getActors().then((response) => {
            for(let i=0; i< response.length; i++){
                expect(response[i].name).toEqual(arrayOfActors[i].name)
                expect(response[i].sex).toEqual(arrayOfActors[i].sex)
                expect(response[i].activeyear).toEqual(arrayOfActors[i].activeyear)
            }
        })
    })

    describe("get actor by pk", () => {
        it("Should return actor", () => {
            const data = new Actor()
            data.name = "wijaya"
            data.activeyear = 2013
            data.sex = "M"
    
            const actorResolver= new ActorResolver()
            actorResolver.createActor(data.name, data.sex, data.activeyear).then((response) => {
                actorResolver.getActor(response.id).then((response2) => {
                    expect(response2.id).toEqual(response.id)
                })
            })
        })
        it("Should return error", () => {
            const data = new Actor()
            data.name = "wijaya"
            data.activeyear = 2013
            data.sex = "M"
    
            const actorResolver= new ActorResolver()
            actorResolver.getActor("7868d025-dd69-4e1e-927c-0c16441c675f").then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })

    describe("delete actor by pk", () => {
        it("Should return actor", () => {
            const data = new Actor()
            data.name = "wijaya"
            data.activeyear = 2013
            data.sex = "M"
    
            const actorResolver= new ActorResolver()
            actorResolver.createActor(data.name, data.sex, data.activeyear).then((response) => {
                actorResolver.deleteActor(response.id).then((response2) => {
                    expect(response2.id).toEqual(response.id)
                })
            })
        })
        it("Should return error", () => {
            const data = new Actor()
            data.name = "wijaya"
            data.activeyear = 2013
            data.sex = "M"
    
            const actorResolver= new ActorResolver()
            actorResolver.deleteActor("7868d025-dd69-4e1e-927c-0c16441c675f").then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })

    describe("update actor", () => {
        it("Should return actor", () => {
            const data = new Actor()
            data.name = "wijaya"
            data.activeyear = 2013
            data.sex = "M"
    
            const actorResolver= new ActorResolver()
            actorResolver.createActor(data.name, data.sex, data.activeyear).then((response) => {
                actorResolver.updateActor(response.id, "inisti", "F", 2012).then((response2) => {
                    expect(response2.id).toEqual(response.id)
                    expect(response2.name).toEqual("inisti")
                    expect(response2.activeyear).toEqual(2012)
                    expect(response2.sex).toEqual("F")
                })
            })
        })
        it("Should return error", () => {
            const data = new Actor()
            data.name = "wijaya"
            data.activeyear = 2013
            data.sex = "M"
    
            const actorResolver= new ActorResolver()
            actorResolver.updateActor("7868d025-dd69-4e1e-927c-0c16441c675f", data.name, data.sex, data.activeyear).then((response) =>{
                expect(response).toEqual(Error("Cannot find user with this uid"))
            })
        })
    })
})