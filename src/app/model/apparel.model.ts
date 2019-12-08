
export class Apparel{
    constructor(
        public id?:number,
        public name?:string, 
        public img_cat?:string,
        public colors: string[]= [],
        public color?:string,
        public category?:string,
        public description?:string,
        public price?:number
    ){}
}