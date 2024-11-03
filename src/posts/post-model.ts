import { Column, Model, Table, DataType,ForeignKey,BelongsTo } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid'
import { User } from 'src/User/user-model';
@Table
export class Post extends Model<Post> {
 @Column({
        type: DataType.UUID,
        defaultValue: () => uuidv4(), 
        primaryKey: true, 
      })
      id: string; 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING, 
    allowNull: true,
  })
  imageUrl: string; 


 @Column({
    type: DataType.JSON,
    allowNull: true, 
  })
  comments: object; 

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @ForeignKey(()=>User)
  @Column({
    type:DataType.UUID,
    allowNull:false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user_uuid:string


  @BelongsTo(() => User) 
    user: User;
}
