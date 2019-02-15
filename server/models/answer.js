export default (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Answer.associate = (models) => {
    Answer.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });

    Answer.belongsTo(models.Question, {
      foreignKey: 'questionId',
      as: 'question',
      onDelete: 'CASCADE',
    });
  };
  
  return Answer;
};
