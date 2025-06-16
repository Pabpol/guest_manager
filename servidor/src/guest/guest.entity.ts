import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guest')
export class GuestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  menu: string;

  @Column({ default: false })
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
