import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserWork {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({name: 'username'})
  public username: string;

  @Column({ name: 'work_id' })
  public workId: number;

  @Column('jsonb', {name: 'last_paused_position', nullable: true})
  public lastPausedPosition: {chapterId: number, scrollPosition: number} | null;

  @Column()
  public finished: boolean;

  @Column({name: 'last_visited'})
  public lastVisited: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
