export class IngreEgreso {
    public description: String;
    public amount: number;
    public type: string;
    public uid?: string;

    constructor(obj: any) {
        this.description = obj && obj.description || null;
        this.amount = obj && obj.amount || null;
        this.type = obj && obj.type || null;
        obj && obj.uid && (this.uid = obj && obj.uid);
    }

}