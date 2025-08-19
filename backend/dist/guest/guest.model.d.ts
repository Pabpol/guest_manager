import { Model } from 'sequelize-typescript';
export declare class Guest extends Model<Guest> {
    nombre: string;
    apellido: string;
    menu: string;
    tieneAcompanante: boolean;
    nombreAcompnanante: string;
    apellidoAcompanante: string;
    menuAcompanante: string;
    mail: string;
}
