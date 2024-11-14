import { RequestHandler } from "express"
import { connect } from "../database"
import bcrypt from "bcrypt"

const listUsers: RequestHandler = async (req, res) => {
  const db = await connect()
  const users = await db.all(`SELECT * FROM users`)
  res.status(200).json(users)
}

const createUser: RequestHandler = async (req, res) => {
  const db = await connect()
  try {
    const { name, email, password } = req.body
    const encryptedPassword = await bcrypt.hash(password, 10)
    const ret = await db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`, [name, email, encryptedPassword])
    res.status(200).json(ret)
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateUser: RequestHandler = async (req, res) => {
  const db = await connect()
  const { id, name, email, password } = req.body
  const encryptedPassword = await bcrypt.hash(password, 10)
  const ret = db.run(`UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`, [name, email, encryptedPassword, id])
  res.status(200).json(ret)
}

const deleteUser: RequestHandler = async (req, res) => {
  const db = await connect()
  const { id } = req.body
  const ret = db.run(`DELETE FROM users WHERE id = ?`, [id])
  res.status(200).json(ret)
}

export default {
  listUsers,
  createUser,
  updateUser,
  deleteUser
}
