import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GuestInput {
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
