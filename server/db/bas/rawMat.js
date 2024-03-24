const pool = require('../pool');

const getRawMatList = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.execute(`
      select raw_id
           , rawknm
           , rawrem
        from tb_bas0100
       order by raw_id desc
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
exports.getRawMatList = getRawMatList;

exports.rawMatInsert = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      insert into tb_bas0100 (
          rawknm
        , rawrem
      ) values (
          :rawknm
        , :rawrem
      )
    `, data);
    if (result.affectedRows !== 1) throw 'error';
    // await conn.rollback();
    const list = await getRawMatList();
    return list;
  } catch (error) {
    console.error('SQL Error: ', error);
    // await conn.rollback();
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

exports.rawMatDetail = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      select raw_id
           , rawknm
           , rawrem
        from tb_bas0100
       where raw_id = '${data.raw_id}'
    `);
    // await conn.rollback();
    return result.length ? result[0] : null;
  } catch (error) {
    console.error('SQL Error: ', error);
    // await conn.rollback();
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

exports.rawMatUpdate = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      update tb_bas0100
         set rawknm = :rawknm
           , rawrem = :rawrem
       where raw_id = :raw_id
    `, data);
    if (result.changedRows === 0) throw 'tb_bas0100_update_error';
    // await conn.rollback();
    const list = await getRawMatList();
    return list;
  } catch (error) {
    console.error('SQL Error: ', error);
    // await conn.rollback();
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

exports.rawMatDelete = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const result = await conn.execute(`
      delete from tb_bas0100
       where raw_id = :raw_id
    `, { raw_id: data.raw_id});
    console.log(result);
    if (result.affectedRows === 0) throw 'tb_bas0100_delete_error';
    // await conn.rollback();
    const list = await getRawMatList();
    return list;
  } catch (error) {
    console.error('SQL Error: ', error);
    // await conn.rollback();
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
