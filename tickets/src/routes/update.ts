import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, currentUser, NotFoundError, NotAuthorizedError } from '@ahmet229ticketing/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import mongoose from 'mongoose';
import { natsWrapper } from '../nats-wrapper';
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';

const router = express.Router();

router.put(
    '/api/tickets/:id',
    requireAuth,
    [
        body('title')
            .not()
            .isEmpty()
            .withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be greater than zero.')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const ticketId = req.params.id;
        if (!mongoose.isValidObjectId(ticketId)) {
            throw new NotFoundError();
        }

        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        const { title, price } = req.body;
        ticket.set({
            title: title,
            price: price
        });
        ticket.save();

        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            userId: ticket.userId
        });

        
        res.send(ticket);
    });

export { router as updateTicketRouter };