import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GuestType {
  @Field(type => Int)
  id: number;

  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  menu: string;

  @Field({ nullable: true })
  tieneAcompanante?: boolean;

  @Field({ nullable: true })
  nombreAcompnanante?: string;

  @Field({ nullable: true })
  apellidoAcompanante?: string;

  @Field({ nullable: true })
  menuAcompanante?: string;

  @Field()
  mail: string;
}
