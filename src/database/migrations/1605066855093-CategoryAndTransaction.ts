import {MigrationInterface, QueryRunner} from "typeorm";

export class CategoryAndTransaction1605066855093 implements MigrationInterface {
    name = 'CategoryAndTransaction1605066855093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP DEFAULT NOW(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "type" character varying NOT NULL, "value" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT NOW(), "updated_at" TIMESTAMP DEFAULT NOW(), "category_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f"`, undefined);
        await queryRunner.query(`DROP TABLE "transactions"`, undefined);
        await queryRunner.query(`DROP TABLE "categories"`, undefined);
    }

}
