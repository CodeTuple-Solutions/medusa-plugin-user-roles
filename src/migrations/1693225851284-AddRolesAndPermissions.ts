import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class AddRolesAndPermissions1693225851284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role_id" character varying`)
        await queryRunner.query(`CREATE TABLE "permission" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "metadata" jsonb, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`)
        await queryRunner.query(`CREATE TABLE "role" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`)
        await queryRunner.query(`CREATE TABLE "role_permissions" ("role_id" character varying NOT NULL, "permission_id" character varying NOT NULL, CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY ("role_id", "permission_id"))`)
        await queryRunner.query(`CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id") `)
        await queryRunner.query(`CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id") `)

        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`CREATE INDEX "IDX_fb2e442d14add3cefbdf33c456" ON "user" ("role_id") `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`)
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`)
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_29259dd58b1052aef9be56941d4"`)
        await queryRunner.query(`DROP INDEX "public"."IDX_fb2e442d14add3cefbdf33c456"`)
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`)
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`)
        await queryRunner.query(`DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"`)
        await queryRunner.query(`DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"`)
        await queryRunner.query(`DROP TABLE "role_permissions"`)
        await queryRunner.query(`DROP INDEX "public"."IDX_29259dd58b1052aef9be56941d"`)
        await queryRunner.query(`DROP TABLE "role"`)
        await queryRunner.query(`DROP TABLE "permission"`)
    }

}