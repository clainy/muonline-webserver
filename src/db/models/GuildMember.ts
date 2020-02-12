import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasOne,
  BelongsTo
} from 'sequelize-typescript';

import Guild from './Guild';
import Character from './Character';

@Table
export default class GuildMember extends Model<GuildMember> {
  @PrimaryKey
  @Column
  Name: string;

  @Column
  G_Name: string;

  @Column
  G_Level: number;

  @Column
  G_Status: number;

  @HasOne(() => Guild, { sourceKey: 'G_Name', foreignKey: 'G_Name' })
  guild: Guild;
}
