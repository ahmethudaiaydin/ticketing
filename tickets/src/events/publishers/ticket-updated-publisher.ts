import { Publisher, Subjects, TicketUpdatedEvent } from '@ahmet229ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}