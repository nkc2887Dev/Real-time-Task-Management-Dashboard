import { SeedService } from "./service";

export class InitSeed {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seedRoles();
  }
}
