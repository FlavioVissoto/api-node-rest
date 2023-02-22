import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
    return res.json("Vissoto");
});

router.get("/:id", (req, res) => {
    return res.status(StatusCodes.OK).json("Vissoto");
});

export { router };
