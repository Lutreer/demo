// 定义各种通用的 mongoose 数据库操作方法
const User = require('../dbs.js').User // 从dbs.js引入数据表

/**
 * 数据库操作
 */

// 增加用户，方法一：save()
const saveUser = async (ctx) => {
  // 通过实例化一个 User 对象在添加用户
  const newUser = new User({
    username: 'cedric',
    password: '123',
    age: 27
  })

  let code = 0 // 状态码
  let result = '' // 返回内容

  try {
    let doc = await newUser.save()
    code = 0
    result = '保存成功, ' + doc
  } catch (err) {
    code = -1
    result = '保存失败, ' + err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 增加用户，方法二：create(), 推荐此方法
// 使用save()方法，需要先实例化为文档，再使用save()方法保存文档。而create()方法，则直接在模型Model上操作，并且可以同时新增多个文档
const createUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容

  try {
    let doc = await User.create({
      username: 'cedric222',
      password: '123',
      age: 27
    }, {
      username: 'cedric333',
      password: '123',
      age: 27
    })
    code = 0
    result = '保存成功, ' + doc
  } catch (err) {
    code = -1
    result = '保存失败, ' + err
    console.log(err)
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 根据用户名查找用户
const findUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容

  try {
    let doc = await User.findOne({
      username: 'cedric222'
    })
    code = 0
    result = '查找结果： ' + doc
  } catch (err) {
    code = -1
    result = '查找失败： ' + err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 根据指定条件查找所有用户
// find指的是查找指定表的所有数据，返回的是数组
// findOne指的是查找指定表的单条数据，返回一个对象
const findAllUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容

  try {
    let doc = await User.find({})
    code = 0
    result = '查找结果： ' + doc
  } catch (err) {
    code = -1
    result = '查找失败： ' + err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 修改用户数据
// conditions: 查询条件；updateDoc：需要修改的数据, 都是一个对象
// multi (boolean)： 默认为false。是否更新多个查询记录。
// https://segmentfault.com/a/1190000012095054#articleHeader16
// https://mongoosejs.com/docs/api.html#model_Model.update
const updateUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容

  try {
    let doc = await User.update({age: 27}, {age: 28}, {multi: true})
    code = 0
    result = '修改结果： ' + doc
    console.log(doc)
  } catch (err) {
    code = -1
    result = '修改失败： ' + err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 删除用户数据
const removeUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容

  try {
    let doc = await User.remove({username: 'cedric444'})
    code = 0
    result = '删除成功： ' + doc
    console.log(doc)
  } catch (err) {
    code = -1
    result = '删除失败： ' + err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

module.exports = {
  saveUser,
  createUser,
  findUser,
  findAllUser,
  updateUser,
  removeUser
}
