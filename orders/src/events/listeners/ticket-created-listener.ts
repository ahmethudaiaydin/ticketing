import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@ahmet229ticketing/common';
import { Ticket } from '../../models/ticket';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;

    // Queue group; publish edilen bir event message'ın, aynı servisin birden fazla instance'ı tarafında consume edilmemesi için kullanılıyor.
    // Yani orders-service'den biz 5 instance ayağı kaldırdığımızda nat-streaming'in bir event'i sadece subscribe olan bu 5 instance'dan bir tanesinin
    // consume etmesini sağlıyoruz.
    queueGroupName = queueGroupName;

    // Data'nın tipindeki TicketCreatedEvent['data'] şu demek oluyor. 
    // Datanın type check'ini yapmak için TicketCreatedEvent üzerindeki 'data' property'sine git ve onunla validate et.
    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;
        const ticket = Ticket.build({
            id,
            title,
            price,
        });
        await ticket.save();
        msg.ack();
    }

}