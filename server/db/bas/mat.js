const pool = require('../pool');

const getMatList = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.execute(`
      select mat_id
           , matknm
           , matunt
           , case when bellyn = 'N' then ''
             else concat(matqty, matunt, ' 이하') end bellmsg
           , get_rawknm(raw_id) rawknm
           , matrem
        from tb_bas0200
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
exports.getMatList = getMatList;

exports.matInsert = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      insert into tb_bas0200 (
          matknm
        , matunt
        , raw_id
        , matrem
        , bellyn
        , matqty
      ) values (
          :matknm
        , :matunt
        , :raw_id
        , :matrem
        , :bellyn
        , :matqty
      )
    `, data);
    if (result.affectedRows !== 1) throw 'error';
    // await conn.rollback();
    const list = await getMatList();
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

exports.matDetail = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      select matknm
           , matunt
           , raw_id
           , matrem
           , bellyn
           , matqty
        from tb_bas0200
       where mat_id = :mat_id
    `, { mat_id: data.mat_id });
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

exports.matUpdate = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      update tb_bas0200
         set matknm = :matknm
           , bellyn = :bellyn
           , matqty = :matqty
           , matunt = :matunt
           , raw_id = :raw_id
           , matrem = :matrem
       where mat_id = :mat_id
    `, data);
    if (result.affectedRows !== 1) throw 'error';
    // await conn.rollback();
    const list = await getMatList();
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

exports.matDelete = async (data) => {
  let conn;
  try {
    conn = await pool.getConnection();
    // await conn.beginTransaction();
    const [result] = await conn.execute(`
      delete from tb_bas0200
       where mat_id = :mat_id
    `, { mat_id: data.mat_id });
    if (result.affectedRows !== 1) throw 'error';
    // await conn.rollback();
    const list = await getMatList();
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
