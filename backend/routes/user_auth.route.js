import express from 'express'

const router = express.Router();

router.get('/user/signup', (req, res)=>{
    res.send("user signup");
})

export default router;