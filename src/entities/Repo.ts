/**
 * @format
 */
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';
@Entity()
export class Repo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // The display name of the repo
  @Column('text', {nullable: false})
  name: string;

  @Column('int', {nullable: true})
  stars: number;
}
