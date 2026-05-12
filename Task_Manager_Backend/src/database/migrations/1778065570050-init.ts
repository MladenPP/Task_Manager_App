import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1778065570050 implements MigrationInterface {
  name = 'Init1778065570050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  CREATE TYPE "task_status_enum" AS ENUM (
    'backlog',
    'to_do',
    'in_progress',
    'testing',
    'done'
  )
`);
    await queryRunner.query(`
  CREATE TYPE "user_role_enum" AS ENUM (
    'user',
    'admin'
  )
`);
    await queryRunner.query(
      `CREATE TABLE "task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "dueDate" TIMESTAMP NOT NULL, "status" "task_status_enum" NOT NULL DEFAULT 'backlog', "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "deletedAt" TIMESTAMP, CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "task"`);
  }
}
