import { getDataByPage } from './actions';
import PaginationChild from './paginationChild.jsx';

export default async function A () {
  const {data,total} = await getDataByPage(1)

  return <div>
    <h2>Pagination</h2>
    <PaginationChild initData={data} initTotal={total}></PaginationChild>
  </div>;
}


