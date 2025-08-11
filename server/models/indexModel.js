const sequelize = require("../config/db"); 
const User = require("./user");
const Posts = require("./post");

User.hasMany(Posts, { foreignKey:'userId', onDelete: "CASCADE" });
Posts.belongsTo(User,{foreignKey:'userId'});


const syncDatabase = async () => {
  try {
    await sequelize.sync({alter:true}); 
    console.log(" Database synced successfully.");
  } catch (error) {
    console.error(" Error syncing database:", error);
  }
};

syncDatabase();

module.exports = { User, Posts, sequelize };
