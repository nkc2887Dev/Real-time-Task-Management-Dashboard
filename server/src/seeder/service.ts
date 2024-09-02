import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import rolesData from "./roles.json";
import { Role } from "src/modules/role/role.schema";

export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}

  async seedRoles(): Promise<boolean> {
    try {
      await Promise.all(
        rolesData.map(async (data) => {
          const findRole = await this.roleModel.findOne({ code: data.code }).exec();
          if (!findRole) {
            await this.roleModel.create(data);
            this.logger.log(`Role ${data.name} seeded successfully! 👥`);
          }
        }),
      );

      this.logger.log("All roles have been seeded successfully!");
      return true;
    } catch (error) {
      this.logger.error(`Error - seedRoles : `, error);
      throw error;
    }
  }
}
