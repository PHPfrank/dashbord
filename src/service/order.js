import request from '../util/request';

//获取所有订单
export function all(values){
    return request(`/admin/react/getAllOrder`, {
        method: 'POST',
        body: JSON.stringify(values),
      });
}

//获取单个订单
export function single(id){
    return request(`/admin/react/getSingleOrder?order_id=${id}`, {
        method: 'GET',
      });
}