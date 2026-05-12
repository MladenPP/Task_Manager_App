import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBoardAndRelations1778074921331 implements MigrationInterface {
  name = 'AddBoardAndRelations1778074921331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board_users_user" ("boardId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_be1e927034c2479858e6d6a1546" PRIMARY KEY ("boardId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_429493a491957e757423f7ddef" ON "board_users_user" ("boardId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_523009f956b8194970cd48dc7d" ON "board_users_user" ("userId") `,
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "boardId" integer`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_users_user" ADD CONSTRAINT "FK_429493a491957e757423f7ddef7" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_users_user" ADD CONSTRAINT "FK_523009f956b8194970cd48dc7df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_users_user" DROP CONSTRAINT "FK_523009f956b8194970cd48dc7df"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_users_user" DROP CONSTRAINT "FK_429493a491957e757423f7ddef7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`,
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "boardId"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_523009f956b8194970cd48dc7d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_429493a491957e757423f7ddef"`,
    );
    await queryRunner.query(`DROP TABLE "board_users_user"`);
    await queryRunner.query(`DROP TABLE "board"`);
  }
}
