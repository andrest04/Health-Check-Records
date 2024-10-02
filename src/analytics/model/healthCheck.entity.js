export class HealthCheck {
    constructor({id='', treadmillId='', year =0, month=0, day=0, hour=0, minutes=0, seconds=0, volts=0, watts=0, hp=0}) {
        this.id = id;
        this.treadmillId = treadmillId;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minutes = minutes;
        this.seconds = seconds;
        this.volts = volts;
        this.watts = watts;
        this.hp = hp;
    }
}