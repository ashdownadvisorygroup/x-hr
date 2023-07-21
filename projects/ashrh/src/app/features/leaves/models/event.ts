export class Events {
  id: number;
  reason: string;
  state: string;
  leaveType: any[];
  start_date: Date;
  end_date: Date;
  employee: any;
  type: any[];

  constructor(id) {
    this.id = id;
  }
}
