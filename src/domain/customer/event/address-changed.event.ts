import EventInterface from "../../@shared/event/event.interface";

export default class AddressChangedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date()
        this.eventData = eventData
    }
}