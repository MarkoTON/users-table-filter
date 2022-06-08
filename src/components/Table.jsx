import useAxios from "../hooks/useAxios";
import moment from "moment";
import Skeleton from "./Skeleton";
import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

const column = [
  { heading: 'Username', value: 'login.username' },
  { heading: 'Name', value: 'name.first' },
  { heading: 'Email', value: 'email' },
  { heading: 'Gender', value: 'gender' },
  { heading: 'Registered Date', value: 'registered.date' },
]

const Table = () => {
  const { response, loading } = useContext(UsersContext);

  if(loading) {
    return (
      <div>
        <Skeleton className='h-10' />
        <Skeleton className='mt-2 h-96' />
      </div>
    )
  }

  return (
    <table className="w-full text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {column.map((item, index) => <TableHeadItem item={item} key={index} />)}
        </tr>
      </thead>
      <tbody>
        {response && response.map((item, index) => <TableRow item={item} column={column} key={index} />)}
      </tbody>
    </table>
  )
}

const TableHeadItem = ({ item, index }) => <th key={index} scope="col" className="px-6 py-3">{item.heading}</th>
const TableRow = ({ item, column, index }) => (
  <tr key={index} className="border-b">
    {column.map((columnItem, index) => {

      const renderTd = value => <td key={index} className="px-6 py-4">{value}</td>

      if(columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.');
        const itemValue = item[itemSplit[0]][itemSplit[1]];

        if(itemSplit.includes('date')) {
          return renderTd(moment(itemValue).format('DD-MM-YYYY h:mm'));
        }
        if(itemSplit.includes('name')) {
          return renderTd(`${itemValue} ${item[itemSplit[0]]['last']}`);
        }
        return renderTd(itemValue);
      }

      return renderTd(item[`${columnItem.value}`]);
    })}
  </tr>
)

export default Table