const pool = require('./pool');

exports.getAllUsers = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.execute(`
      select * from user_demo
    `);
    return result;
  } catch (error) {
    console.error('SQL Error: ', error);
  } finally {
    if (conn) {
      try {
        await conn.release();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

exports.insertUser = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();
    const result = await conn.execute(`
      insert into user_demo (name) values (?)
    `, [data.name]);
    await conn.rollback();
    return result;
  } catch (error) {
    console.error('SQL Error: ', error);
    await conn.rollback();
  } finally {
    if (conn) {
      try {
        await conn.release();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
