export class Event {
  id: number;
  reason: string;
  state: string;
  leaveType: any[];
  start_date: Date;
  end_date: Date;

  constructor(id) {
    this.id = id;
  }
}
