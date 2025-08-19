import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'guests',
  underscored: true,
  timestamps: false,
})
export class Guest extends Model<Guest> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nombre: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apellido: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  menu: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  tieneAcompanante: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nombreAcompnanante: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apellidoAcompanante: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  menuAcompanante: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  mail: string;
}