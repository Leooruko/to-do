export type Activity = {
    id?:number | null,
    activity?: string | null;
    type?: string | null;
    set_on?: string | null;
    due_on: string;
    delete_on?: string | null;
  };