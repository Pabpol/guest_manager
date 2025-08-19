export class CreateGuestDto {
  nombre?: string;
  apellido?: string;
  menu?: string;
  tieneAcompanante?: boolean;
  nombreAcompnanante?: string;
  apellidoAcompanante?: string;
  menuAcompanante?: string;
  mail: string;
}

export class GuestResponseDto {
  nombre?: string;
  apellido?: string;
  menu?: string;
  nombreAcompnanante?: string;
  apellidoAcompanante?: string;
  menuAcompanante?: string;
}