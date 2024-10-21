import express from 'express'

const router = express.Router();

router.get('/admin/singup', (req, res)=>{
    res.send("admin signup");
})

export default router;