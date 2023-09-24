import { Router } from "express";

const router = Router();

router.get('/api/orders', async (req,res)=>{});
router.get('/api/orders/:idOrder', async (req,res)=>{});
router.post('/api/orders', async (req,res)=>{});
router.put('/api/orders/:idOrder', async (req,res)=>{});
router.delete('/api/orders/:idOrder', async (req,res)=>{});


export default router;