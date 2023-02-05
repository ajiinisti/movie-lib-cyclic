import { Sequelize, DataTypes } from "sequelize"
import * as pg from 'pg';

export function dbConnection() {
    const sequelize = new Sequelize(`postgres://postgres:${process.env.SUPABASE_PASS}@db.${process.env.SUPABASE_URL}:${process.env.SUPABASE_PORT}/postgres`, {
        dialectModule: pg
    })
    console.log(`postgres://postgres:${process.env.SUPABASE_PASS}@db.${process.env.SUPABASE_URL}:${process.env.SUPABASE_PORT}/postgres`)

    const Movies = sequelize.define('movies', {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        releaseyear: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        rating: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        genre: {
          type: DataTypes.STRING,
          allowNull: false
        }
      });
  
    const Actors = sequelize.define('actors', {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        activeyear: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        sex: {
          type: DataTypes.STRING,
          allowNull: false
        }
      });
  
    const Authors = sequelize.define('authors', {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        sex: {
          type: DataTypes.STRING,
          allowNull: false
        }
      });
  
      const Plays = sequelize.define('play', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        }
    });
  
    const Writes = sequelize.define('write', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        }
      });
  
    Movies.belongsToMany(Actors, { through: Plays });
    Actors.belongsToMany(Movies, { through: Plays });
    Movies.hasMany(Plays)
    Plays.belongsTo(Movies)
    Actors.hasMany(Plays)
    Plays.belongsTo(Actors)
  
    Movies.belongsToMany(Authors, { through: Writes });
    Authors.belongsToMany(Movies, { through: Writes });
    Movies.hasMany(Writes)
    Writes.belongsTo(Movies)
    Authors.hasMany(Writes)
    Writes.belongsTo(Authors)
    
    return [Movies, Actors, Authors, Plays, Writes] as const
}