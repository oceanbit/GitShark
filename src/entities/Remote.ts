import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Remote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  url: string;
}
