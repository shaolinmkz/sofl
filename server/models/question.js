export default (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    title: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    body: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Question.associate = (models) => {
    Question.hasMany(models.Answer, {
      as: 'answers',
      foreignKey: 'questionId'
    })
  };
  return Question;
};
