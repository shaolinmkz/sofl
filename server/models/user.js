export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Question, {
      as: 'askedQuestion',
      foreignKey: 'userId'
    });

    User.hasMany(models.Answer, {
      as: 'answerReply',
      foreignKey: 'userId',
    });
  };
  return User;
};
