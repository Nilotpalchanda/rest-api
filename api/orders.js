const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.status(200).json({
        message:"Get all orders  here"
    })
})
router.post('/',(req,res)=>{
    const order = {
        name : req.body.name,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message:"Insert  orders  here",
        createdOrder: order
    })
})
router.patch('/:orderId',(req,res)=>{
    res.status(200).json({
        message:"update  orders  here",
        id: req.params.orderId
    })
})
router.get('/:orderId',(req,res)=>{
    res.status(200).json({
        message:"search specific order  orders  here",
        id: req.params.orderId
    })
})
router.delete('/:orderId',(req,res)=>{
    res.status(200).json({
        message:"delete  orders  here",
        id: req.params.orderId
    })
})




module.exports = router