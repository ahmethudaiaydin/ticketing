import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@ahmet229ticketing/common';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticketId = req.params.id;
    if (!mongoose.isValidObjectId(ticketId)) {
        throw new NotFoundError();
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
        throw new NotFoundError();
    }

    return res.status(200).send(ticket);
});

export { router as showTicketRouter };