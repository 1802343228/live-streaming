'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, TEXT } = Sequelize;
    return queryInterface.createTable('live_user',{
      id:{
        type: INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
      },
      live_id:{
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '直播间id',
        references:{
          model: 'live',
          key: 'id',
        },
        onDelete:'cascade',
        onUpdate:'restrict',//更新时操作
      },
      user_id:{
        type:INTEGER,
        allowNull:false,
        defaultValue:0,
        commeny:'用户Id',
        references:{
          model:'user',
          key:'id',
        },
        onDelete:'cascade',
        onUpdate:'restrict',
      },
      created_time:DATE,
      updated_time:DATE,
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('live_user');
  }
};
