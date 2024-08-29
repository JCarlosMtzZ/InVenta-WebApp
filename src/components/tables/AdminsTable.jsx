function AdminsTable({ data }) {
  return (
    <div className="w-full bg-white p-2 rounded-lg shadow-md h-[225px] overflow-auto">
      <table className="w-full">
        <thead>
          <tr className='border-b-2 border-purp-dark'>
            <th className='text-wrap text-left p-2'>Vendedor</th>
            <th className='text-wrap text-left p-2'>Unidades vendidas</th>
            <th className='text-wrap text-left p-2'>Ingresos brutos</th>
            <th className='text-wrap text-left p-2'>Ingresos netos</th>
          </tr>
        </thead>
        <tbody>
          {data.map(summary => (
            <tr key={summary.adminId} className='border-b-2 border-purp-dark/15'>
              <td className='p-4 text-left'>
                {summary.adminFullName}
              </td>
              <td className='p-4 text-center'>
                {summary.totalUnits}
              </td>
              <td className='p-4 text-right text-blue'>
                {`$${summary.subtotal}`}
              </td>
              <td className='p-4 text-right text-ok-green'>
                {`$${summary.total}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsTable;