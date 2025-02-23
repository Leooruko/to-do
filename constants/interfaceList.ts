export type Activity = {
    id:number,
    activity: string;
    type: string;
    set_on: string | null;
    due_on: string;
    delete_on: string | null;
  };