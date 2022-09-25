import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique('user_device_pair', ['username', 'deviceId'])
export class DevicePreferences {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({name: 'username'})
  public username: string;

  @Column({name: 'device_id'})
  public deviceId: string;

  @Column('jsonb', { name: 'display_preferences', nullable: false, default: {} })
  public displayPreferences: any;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updatedAt: Date;
}
