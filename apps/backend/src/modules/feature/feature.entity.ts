import BaseEntity from '@helpers/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('features')
export class Feature extends BaseEntity {
  @Column({ length: 50 })
  name!: string;

  @Column()
  isActive!: boolean;
}
