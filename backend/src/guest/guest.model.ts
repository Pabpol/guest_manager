import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guests')
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nombre: string;

  @Column({ nullable: true })
  apellido: string;

  @Column({ nullable: true })
  menu: string;

  @Column({ nullable: true, default: false })
  tieneAcompanante: boolean;

  @Column({ nullable: true })
  nombreAcompnanante: string;

  @Column({ nullable: true })
  apellidoAcompanante: string;

  @Column({ nullable: true })
  menuAcompanante: string;

  @Column({ unique: true })
  mail: string;
}