export abstract class Job {
    constructor(public payload: any) { }

    abstract execute(): Promise<void>;
}