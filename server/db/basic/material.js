const pool = require('../pool');

exports.getMaterialList = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.execute(`
      select *
           , get_matpnm(mat_id) matknm
        from tb_bas0200
       order by mas_id desc
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

exports.insertMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      insert into tb_bas0200
      (maspnm, msvnqy, mat_id) values
      (:maspnm, :msvnqy, :mat_id)
    `, data);
    if (result.affectedRows !== 1) throw 'error';
    // await conn.rollback();
    return result;
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

exports.editMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      select maspnm, msvnqy, mat_id
        from tb_bas0200
       where mas_id = '${data.mas_id}'
    `);
    // await conn.rollback();
    return result;
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

exports.updateMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      update tb_bas0200
         set maspnm = :maspnm
           , msvnqy = :msvnqy
           , mat_id = :mat_id
       where mas_id = :mas_id
    `, data);
    if (result.affectedRows !== 1) throw 'error';
    // await conn.rollback();
    return result;
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

exports.deleteMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      delete from tb_bas0200
       where mas_id = '${data.mas_id}'
    `);
    if (result.affectedRows !== 1) throw 'error';
    // await conn.rollback();
    return result;
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
