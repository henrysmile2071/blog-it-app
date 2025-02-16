const { Sequelize, DataTypes } = require('sequelize');

const tableNames = ['user', 'blog'];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS public."user"
      (
          id serial PRIMARY KEY,
          username VARCHAR(128) NOT NULL,
          email VARCHAR(128) UNIQUE NOT NULL,
          password VARCHAR(128) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
        
      CREATE TABLE IF NOT EXISTS public."post"
      (
          id serial NOT NULL,
          user_id integer NOT NULL,
          title character varying(255) COLLATE pg_catalog."default" NOT NULL,
          content character varying(255) COLLATE pg_catalog."default" NOT NULL,
          created_at timestamp with time zone,
          updated_at timestamp with time zone,
          CONSTRAINT "post_user_id_fkey" FOREIGN KEY (user_id)
              REFERENCES public."user" (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const tablePromises = tableNames.map(async table => {
        await queryInterface.dropTable(table, { transaction, cascade: true });
      });

      await Promise.all(tablePromises);
    });
  },
};
