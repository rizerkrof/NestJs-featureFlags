module.exports = class addFeature1695192134342 {
  name = 'addFeature1695192134342';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "features" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_5c1e336df2f4a7051e5bf08a941" PRIMARY KEY ("id"))`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "features"`);
  }
};
