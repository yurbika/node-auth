import { BigIntType } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey({ type: BigIntType, hidden: true })
  id!: number;

  @Property({ type: "text", unique: true })
  email!: string;

  @Property({ type: "text" })
  name!: string;

  @Property({ type: "text", hidden: true })
  password!: string;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
