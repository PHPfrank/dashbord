import request from '../util/request';

//获取所有用户
export function all(values){
    return request(`/admin/react/getAllUser`, {
        method: 'POST',
        body: JSON.stringify(values),
      });
}

//获取单个用户
export function single(id){
    return request(`/admin/react/getSingleUser?user_id=${id}`, {
        method: 'GET',
      });
}

 //删除
 export function remove(id) {
    return request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
  //修改
  export function patch(id, values) {
    return request(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
      headers: {
      'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    });
  }
  //新增
  export function create(values) {
     return request('/api/users', {
         method: 'POST',
          body: JSON.stringify(values),
        });
    }