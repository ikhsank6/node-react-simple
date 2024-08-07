import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize from "../config/database";
import UserAttributes from "../interface/user.interface";

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }
class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public name!: string | null;
    public keterangan!: string | null;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel(sequelize: Sequelize): typeof User {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                keterangan: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: "users",
            }
        );

        return User;
    }
}

User.initModel(sequelize);

export default User;
