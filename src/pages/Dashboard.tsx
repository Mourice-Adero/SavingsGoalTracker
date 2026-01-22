function Dashboard() {
  return (
    <div>
      <h2>Products Details</h2>
      <p>Inua mkulima wallet balance: Kes 2,400.00</p>
      <div className="flex gap-4">
        <div className="w-1/2">
          Produts
          <div className=" border rounded-xl bg-[#ffffff] min-h-50">
            <table>
              <thead>
                <th>Product name</th>
                <th>Price</th>
              </thead>
              <tbody>
                <tr>
                  <td>one</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/2">
          Selected Products
          <div className="border rounded-xl bg-[#ffffff] min-h-30"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
