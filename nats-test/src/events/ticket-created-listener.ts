import { Listener } from '@ahmet229ticketing/common';
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from '@ahmet229ticketing/common';
import { Subjects } from '@ahmet229ticketing/common';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;

    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log('Event data!', data);
        
        msg.ack();
    }
}