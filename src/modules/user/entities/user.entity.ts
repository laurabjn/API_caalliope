import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    firstName: string

  @Column()
    lastName: string

  @Column()
    password: string

  @Column()
    email: string

  @Column()
    username: string

  @Column()
    createdAt: Date

  @Column()
    updatedAt: Date
}
