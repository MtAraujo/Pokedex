const express = require('express')
const routes = express.Router()
const mysql = require('../mysql').pool;
const axios = require('axios')


module.exports = routes

routes.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            "SELECT * FROM Pokemon ORDER BY Pokedex ASC",
            (error, resultado, fields) =>{
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
})

routes.post('/add', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO Pokemon (Pokedex, Name, Img, Generation, Type1, Type2) VALUES (?,?,?,?,?,?) ORDER BY Pokedex ASC',
            [req.body.Pokedex, req.body.Name, req.body.Img, req.body.Generation, req.body.FamilyID, req.body.Type1, req.body.Type2],
            (error, resultado, fields) =>{
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                res.status(201).send({
                    mensagem: 'Insere um pokemon',
                    pokemonInserido: resultado.insertPokedex
                })
            }
        )
    })   
})

routes.delete('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM Pokemon WHERE Pokedex = ? ORDER BY Pokedex ASC`, [req.body.Pokedex],
            (error, resultado, fields) =>{
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                res.status(202).send({
                    mensagem: 'Pokemon Removido',
                })
            }
        )
    })
})

routes.patch('/:up_pokemon', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            `Update Pokemon 
                SET Name        = ?,
                    Pokedex     = ?, 
                    Img         = ?, 
                    Generation  = ?, 
                    Type1       = ?, 
                    Type2       = ?
                ORDER BY Pokedex ASC`,
            [
                req.body.Name, 
                req.body.Pokedex, 
                req.body.Img, 
                req.body.Generation,  
                req.body.Type1, 
                req.body.Type2
            ],
            (error, resultado, fields) =>{
                conn.release();
                if (error) { return res.status(500).send({ error: error })}

                res.status(202).send({
                    mensagem: 'Pokemon Atualizado',
                })
            }
        )
    })
})

routes.get('/id_pokemon', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            "SELECT * FROM Pokemon WHERE Name = ? ORDER BY Pokedex ASC",
            [req.body.Name],
            (error, resultado, fields) =>{
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
})

routes.get('/tipo', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            "SELECT * FROM Pokemon WHERE Type1 = ? or Type2 = ? ORDER BY Pokedex ASC",
            [
                req.body.Type1,
                req.body.Type2
            ],
            (error, resultado, fields) =>{
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
})

routes.get('/regiao', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error })}
        conn.query(
            "SELECT * FROM Pokemon WHERE Generation = ? ORDER BY Pokedex ASC",
            [req.body.Generation],
            (error, resultado, fields) =>{
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }
        )
    })
})

