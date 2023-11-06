import { Router } from "express";
import { clientsManager } from "../dao/db/manager/clientsManager.js";

const router = Router();

router.get('/', async(req, res)=>{
    const response = await clientsManager.findAggre();
    res.json({response})
})

export default router;