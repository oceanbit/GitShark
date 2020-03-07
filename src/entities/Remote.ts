import {BaseEntity, Column, PrimaryGeneratedColumn} from 'typeorm';

export class Remote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
