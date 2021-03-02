import db from '../util/database'

export interface ItemInterface {
    id: number;
    name: string;
    categoryId?: number;
    lasts?: number;
    lastBought?: Date 
}

export class Item implements ItemInterface {
    id: number;
    name: string;
    categoryId?: number;
    lasts?: number;
    lastBought?: Date 

    constructor(id: number, name: string, categoryId?: number, lasts?: number, lastBought?: Date) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.lasts = lasts;
        this.lastBought = lastBought;
    }

    static fetchAll() {
        return db.query('SELECT * FROM items')
    }
}