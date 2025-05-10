import express from 'express'

const router = express.Router()

router.use(express.json())

router.get('/', (_req, res) => {
  res.json({
    message: 'Hello, World!'
  })
})

export default router
