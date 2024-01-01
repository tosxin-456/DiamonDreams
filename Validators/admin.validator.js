const { z } = require('zod');
const registerAdmin = z.object({
  email: z.string().email(),
  password:z.string()
})

const addItem = z.object({
  itemName: z.string(),
  itemPrice: z.string(),
  quantity: z.string()
})


module.exports = { registerAdmin , addItem}