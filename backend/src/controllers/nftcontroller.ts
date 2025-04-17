import { Request, Response } from 'express'
import User from '../models/User'
import Track from '../models/Track'
import { v4 as uuidv4 } from 'uuid'
import Bark from 'bark'
const bark = new Bark()

export const generateSongAndMintNFT = async (req: Request, res: Response) => {
  try {
    // Extract details: genre, artist, length, etc.
    const { userId, genre, artist, length, video, videoStyle } = req.body
    const cost = length * 5

    // Fetch user and verify credits
    const user = await User.findById(userId)
    if (!user || user.credits < cost) {
      return res.status(400).json({ error: 'Insufficient credits' })
    }

    // Deduct credits
    user.credits -= cost
    await user.save()

    // Generate the track using the Bark library
    const trackData = await bark.generateTrack({
      genre,
      artist,
      length: Math.ceil(length * 60), // Convert minutes to seconds
      video,
      videoStyle,
    })

    // Connect to your song-generation service and smart contract for NFT minting
    // Replace the following mock implementation with actual service integration
    const track = new Track({
      _id: uuidv4(),
      genre,
      artist,
      length,
      user: userId,
      videoStyle,
      sample: true,
      trackData, // Save the generated track data in the Track model
    })

    await track.save()

    // Update the user's tracks
    user.tracks = user.tracks.concat(track._id)
    await user.save()

    // Send the response
    res.status(200).json({
      message: 'Song generated and NFT minted (stub)',
      trackId: track._id,
    })
  } catch (error) {
    res.status(500).json({ error: 'Generation failed' })
  }
}
