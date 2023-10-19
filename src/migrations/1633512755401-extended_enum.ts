import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMarketingAndContentManagers1691234567890 implements MigrationInterface {
  name = "extendedEnums1633512755401";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Append new values to the enum
    await queryRunner.query(
      `ALTER TYPE "invite_role_enum" ADD VALUE 'marketing_manager'`
    );
    await queryRunner.query(
      `ALTER TYPE "invite_role_enum" ADD VALUE 'content_manager'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the added enum values if necessary
    await queryRunner.query(
      `ALTER TYPE "invite_role_enum" DROP VALUE 'marketing_manager'`
    );
    await queryRunner.query(
      `ALTER TYPE "invite_role_enum" DROP VALUE 'content_manager'`
    );
  }
}
