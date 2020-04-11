import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'remote'})
export class Remote extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'id'})
  id: number;

  @Column({type: 'text', name: 'name'})
  name: string;

  @Column({type: 'text', name: 'url'})
  url: string;
}
