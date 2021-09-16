const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, title, description, author
     FROM blogs LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(blogs){
    const result = await db.query(
      `INSERT INTO blogs 
      (title, description, author) 
      VALUES 
      (?, ?, ?)`, 
      [
        blogs.title, blogs.description, blogs.author 
      ]
    );
  
    let message = 'Error in creating blog';
  
    if (result.affectedRows) {
      message = 'Blog created successfully';
    }
  
    return {message};
  }
  
  async function update(id, blogs){
    const result = await db.query(
      `UPDATE blogs 
      SET title=?, description=?, author=?`, 
      [
        blogs.title, blogs.description,
        blogs.author, id
      ]
    );
  
    let message = 'Error in updating blog';
  
    if (result.affectedRows) {
      message = 'Blog updated successfully';
    }
  
    return {message};
  }
  
async function remove(id){
    const result = await db.query(
      `DELETE FROM blogs WHERE id=?`, 
      [id]
    );
  
    let message = 'Error in deleting blog';
  
    if (result.affectedRows) {
      message = 'Blog deleted successfully';
    }
  
    return {message};
  }
  
  module.exports = {
    getMultiple,
    create,
    update,
    remove
  }