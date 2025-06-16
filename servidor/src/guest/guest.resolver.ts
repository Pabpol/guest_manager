import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GuestService } from './guest.service';
import { GuestType } from './dto/guest.type';
import { GuestInput } from './dto/guest.input';
import { GuestEntity } from './guest.entity';

@Resolver(of => GuestType)
export class GuestResolver {
  constructor(private service: GuestService) {}

  @Mutation(returns => Boolean)
  async addGuest(@Args('input') input: GuestInput): Promise<boolean> {
    return this.service.addGuest(input);
  }

  @Query(returns => [GuestType])
  async listGuests(): Promise<GuestEntity[]> {
    return this.service.listGuests();
  }
}
