import cloudinary from 'cloudinary'

const cloudinaryClient = cloudinary.v2

/**
 * No options needed here since they're being automatically
 * pulled by the Cloudinary SDK using the CLOUDINARY_URL env. variable.
 */
cloudinaryClient.config({
  secure: true,
})

export { cloudinaryClient }
