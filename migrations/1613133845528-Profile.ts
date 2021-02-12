import {MigrationInterface, QueryRunner} from "typeorm"

export class Profile1613133845528 implements MigrationInterface {
    name = "Profile1613133845528"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"channel_role\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"permissions\" integer NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_fe288bc2e8f84d7f2c4386f7812\" PRIMARY KEY (\"id\"))")
        await queryRunner.query("CREATE TABLE \"viewer\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"banned\" boolean NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"userId\" uuid, \"channelId\" uuid, CONSTRAINT \"PK_705451c67494eb3e8dd2aaa3bb1\" PRIMARY KEY (\"id\"))")
        await queryRunner.query("CREATE TABLE \"profile\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"avatar\" character varying NOT NULL, \"description\" character varying NOT NULL, \"bio\" character varying NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_3dd8bfc97e4a77c70971591bdcb\" PRIMARY KEY (\"id\"))")
        await queryRunner.query("CREATE TABLE \"global_role\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"permissions\" integer NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_34044517159e862e349332fb0fe\" PRIMARY KEY (\"id\"))")
        await queryRunner.query("CREATE TABLE \"user\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"username\" character varying NOT NULL, \"verified\" boolean NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"profileId\" uuid, \"channelId\" uuid, CONSTRAINT \"REL_9466682df91534dd95e4dbaa61\" UNIQUE (\"profileId\"), CONSTRAINT \"REL_c2877c905ce84099012e1f6aaf\" UNIQUE (\"channelId\"), CONSTRAINT \"PK_cace4a159ff9f2512dd42373760\" PRIMARY KEY (\"id\"))")
        await queryRunner.query("CREATE TABLE \"channel\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"PK_590f33ee6ee7d76437acf362e39\" PRIMARY KEY (\"id\"))")
        await queryRunner.query("CREATE TABLE \"category\" (\"id\" uuid NOT NULL DEFAULT uuid_generate_v4(), \"name\" character varying NOT NULL, \"visible\" boolean NOT NULL, \"created_at\" TIMESTAMP NOT NULL DEFAULT now(), \"updated_at\" TIMESTAMP NOT NULL DEFAULT now(), \"authorId\" uuid, CONSTRAINT \"PK_9c4e4a89e3674fc9f382d733f03\" PRIMARY KEY (\"id\"))")
        await queryRunner.query("ALTER TABLE \"viewer\" ADD CONSTRAINT \"FK_bc16accc53d1f0e0935bfda2053\" FOREIGN KEY (\"userId\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")
        await queryRunner.query("ALTER TABLE \"viewer\" ADD CONSTRAINT \"FK_20e9f3e219698e0f0086e1a12d7\" FOREIGN KEY (\"channelId\") REFERENCES \"channel\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")
        await queryRunner.query("ALTER TABLE \"user\" ADD CONSTRAINT \"FK_9466682df91534dd95e4dbaa616\" FOREIGN KEY (\"profileId\") REFERENCES \"profile\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")
        await queryRunner.query("ALTER TABLE \"user\" ADD CONSTRAINT \"FK_c2877c905ce84099012e1f6aafc\" FOREIGN KEY (\"channelId\") REFERENCES \"channel\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")
        await queryRunner.query("ALTER TABLE \"category\" ADD CONSTRAINT \"FK_b72ffab954b3129f87176f41fb9\" FOREIGN KEY (\"authorId\") REFERENCES \"user\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"category\" DROP CONSTRAINT \"FK_b72ffab954b3129f87176f41fb9\"")
        await queryRunner.query("ALTER TABLE \"user\" DROP CONSTRAINT \"FK_c2877c905ce84099012e1f6aafc\"")
        await queryRunner.query("ALTER TABLE \"user\" DROP CONSTRAINT \"FK_9466682df91534dd95e4dbaa616\"")
        await queryRunner.query("ALTER TABLE \"viewer\" DROP CONSTRAINT \"FK_20e9f3e219698e0f0086e1a12d7\"")
        await queryRunner.query("ALTER TABLE \"viewer\" DROP CONSTRAINT \"FK_bc16accc53d1f0e0935bfda2053\"")
        await queryRunner.query("DROP TABLE \"category\"")
        await queryRunner.query("DROP TABLE \"channel\"")
        await queryRunner.query("DROP TABLE \"user\"")
        await queryRunner.query("DROP TABLE \"global_role\"")
        await queryRunner.query("DROP TABLE \"profile\"")
        await queryRunner.query("DROP TABLE \"viewer\"")
        await queryRunner.query("DROP TABLE \"channel_role\"")
    }

}
