export type Activity = {
    [key: string]: any;
    id:string | null,
    activity: string | null;
    type: string | null;
    set_on: string | null;
    due_on: string;
    delete_on: string | null;
  };