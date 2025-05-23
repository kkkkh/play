'use server';

export async function getDataByPage(page) {
  // 模仿数据库
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if(page === 1){
    return {
      data: ["id 1", "id 2", "id 3", "id 4", "id 5", "id 6", "id 7", "id 8", "id 9", "id 10"],
      total: 100,
    };
  }else{
    return {
      data: ["id 11", "id 12", "id 13", "id 14", "id 15", "id 16", "id 17", "id 18", "id 19", "id 20"],
      total: 100,
    };
  }
}
