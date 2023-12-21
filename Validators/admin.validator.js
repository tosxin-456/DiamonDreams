const { z } = require('zod');
const registerAdmin = z.object({
  email: z.string().email(),
  password:z.string()
})




module.exports = { registerAdmin }