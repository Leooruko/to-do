import * as SQLite from 'expo-sqlite';
import { Activity } from '@/constants/interfaceList';

class ActivityDataBase {
    private db!: SQLite.SQLiteDatabase;

    constructor() {
        this.init();
    }

    async init() {
        this.db = await SQLite.openDatabaseAsync('activities');
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS activities(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                activity TEXT NOT NULL,
                type TEXT NOT NULL,
                set_on TEXT,
                due_on TEXT,
                deletion_date TEXT
            );
        `);

        // Insert default data only if the table is empty
        // const activities = await this.db.getAllAsync<Activity>("SELECT * FROM activities;");
        // if (activities.length === 0) {
        //     await this.db.runAsync(`
        //         INSERT INTO activities (activity, type, set_on, due_on, deletion_date) 
        //         VALUES 
        //         ('Visit Jill', 'task', ?, ?, ?),
        //         ('Cook a meal', 'task', ?, ?, ?),
        //         ('Clean the house', 'task', ?, ?, ?)
        //     `, 
        //         new Date().toISOString(), new Date(Date.now() + 5 * 86400000).toISOString(), new Date(Date.now() + 10 * 86400000).toISOString(),
        //         new Date().toISOString(), new Date(Date.now() + 5 * 86400000).toISOString(), new Date(Date.now() + 10 * 86400000).toISOString(),
        //         new Date().toISOString(), new Date(Date.now() + 5 * 86400000).toISOString(), new Date(Date.now() + 10 * 86400000).toISOString()
        //     );
        // }
    }

    async fetchActivities(): Promise<Activity[]> {
        return await this.db.getAllAsync<Activity>(`
            SELECT * FROM activities;
        `);
    }

    async addActivity(activity : string,type :string,due_on:string) {
        await this.db.runAsync(`
            INSERT INTO activities (activity, type, set_on, due_on, deletion_date)
            VALUES (?, ?, ?, ?, ?);
        `, 
            activity, 
            type, 
            due_on, 
        );
    }

    async modifyActivity(activity: Activity) {
        try {
            await this.db.runAsync(`
                UPDATE activities 
                SET activity=?, type=?, set_on=?, due_on=?, deletion_date=? 
                WHERE id=?;
            `, 
                activity.activity, 
                activity.type, 
                activity.set_on, 
                activity.due_on, 
                activity.delete_on, 
                activity.id
            );
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    }

    async getActivity(id: string) {
        try {
            return await this.db.getFirstAsync<Activity>(`
                SELECT * FROM activities WHERE id=?;
            `, id);
        } catch (e) {
            console.log(e);
        }
    }
}

const db = new ActivityDataBase();
export default db;
