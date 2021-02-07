import { Migration } from "@mikro-orm/migrations";

export class Migration20210207171857 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" bigserial primary key, "email" text not null, "name" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");'
    );
  }
}
