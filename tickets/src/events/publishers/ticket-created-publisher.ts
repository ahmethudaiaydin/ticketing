import { Publisher, Subjects, TicketCreatedEvent } from '@ahmet229ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}