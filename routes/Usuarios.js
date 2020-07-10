const express = require('express')
const usuarios = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Usuario = require('../models/Usuario')
usuarios.use(cors())

process.env.SECRET_KEY = 'secret'

usuarios.post('/register', (req, res)=> {
  const userData = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    email:req.body.email,
    senha:req.body.senha
  }

  Usuario.findOne({
    where:{
      email: req.body.email
    }
  })
  .then(usuario => {
    if (!usuario) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash
        Usuario.create(userData)
        .then(usuario => {
          res.json({status: usuario.email + 'registered'})
        })
        .catch(err => {
          res.send('error ' + err)
        })
      })
    } else{
      res.json({error: "Usuário já existe."})
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })

  usuarios.post('login',(req, res) =>{
    Usuario.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(usuario => {
      if(usuario){
        if(bcrypt.compareSync(req.body.senha, usuario.senha)){
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        }
      }else{
        res.status(400).json({error: 'Usuário não existe.'})
      }
    })
    .catch(err => {
      res.status(400).json({error: err})
    })
  })
})

module.exports = usuarios;