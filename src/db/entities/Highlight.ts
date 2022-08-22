import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Highlight {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({name: 'highlight_id'})
  public highlightId: number;

  @Column({ name: 'creator_username' })
  public creator: string;

  @Index()
  @Column({ name: 'work_id' })
  public workId: number;

  @Column({ name: 'chapter_id' })
  public chapterId: number;

  @Column({ name: 'start_tag' })
  public startTag: number;

  @Column({ name: 'end_tag' })
  public endTag: number;

  @Column({ name: 'note' })
  public note: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'NOW()' })
  public createdAt: Date;
}
