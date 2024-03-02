const pool = require('../pool');

exports.getRawMaterialList = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.execute(`
      select *
        from tb_bas0100
       order by mat_id desc
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

exports.insertRawMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      insert into tb_bas0100
      (matpnm) values (:matpnm)
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

exports.editRawMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      select mat_id, matpnm from tb_bas0100
       where mat_id = '${data.mat_id}'
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

exports.updateRawMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      update tb_bas0100
         set matpnm = :matpnm
       where mat_id = :mat_id
    `, data);
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

exports.deleteRawMaterial = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      delete from tb_bas0100
       where mat_id = :mat_id
    `, data);
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
