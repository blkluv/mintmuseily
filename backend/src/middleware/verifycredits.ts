import { Request, Response, NextFunction } from 'express'
import { getUserById } from '../services/userService'

export const verifyCredits = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id']
  if (!userId) return res.status(403).json({ error: 'Missing user ID' })

  const user = await getUserById(userId.toString())
  if (!user) return res.status(404).json({ error: 'User not found' })

  const requiredCredits = Number(req.body.length || 1) * 5

  if (user.credits < requiredCredits) {
    return res.status(402).json({ error: 'Insufficient credits' })
  }

  user.credits -= requiredCredits
  await user.save()

  next()
}
