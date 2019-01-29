const userList = {
  userItem : function (data) {
    let newItem = {}
    newItem.list = []
    if(data){
      for(let i = 0; i <data.length; i++){
        newItem.list.push(userAndpass(data[i]))
      }
    }
    return newItem;
  }
}

function  userAndpass(data) {
  let newItem = {}
  newItem.username = data.username
  newItem.password = data.password
  return newItem
}

export default userList
