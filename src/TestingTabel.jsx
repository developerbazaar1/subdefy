import React from "react";
import { useTable } from "react-table";
import NoDataImage from "../src/img/No-Subscrition-2.png";

const TesgingTabel = ({ subscriptions }) => {
  const columns = [
    {
      Header: "Select",
      accessor: "select",
      Cell: () => (
        <input type="checkbox" className="form-check-input tab-check" />
      ),
    },
    {
      Header: "Subscription Name",
      accessor: "subscription_name",
      Cell: ({ value }) => (
        <div className="bg-white br-left text-left">
          <img
            className="tab-icon mx-3 w-20"
            src="https://soft.dbtechserver.online/subdefy/img/tab-icon.png"
            alt="loading"
          />{" "}
          {value}
        </div>
      ),
    },
    {
      Header: "Price",
      accessor: "cost",
      Cell: ({ value }) => (
        <div className="bg-white c-pointer br-top-bottom">{value}</div>
      ),
    },
    {
      Header: "Frequency",
      accessor: "frequency",
      Cell: ({ value }) => (
        <div className="bg-white c-pointer br-top-bottom">{value}</div>
      ),
    },
    {
      Header: "Due",
      accessor: "due",
      Cell: ({ value }) => (
        <div className="bg-white c-pointer br-top-bottom">{value}</div>
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: ({ value }) => (
        <div className="bg-white c-pointer br-top-bottom">{value}</div>
      ),
    },
    {
      Header: "Manage",
      accessor: "manage",
      Cell: ({ value }) => (
        <div className="bg-white c-pointer br-top-bottom">{value}</div>
      ),
    },
    // Add more columns here
    // ...
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: subscriptions ? subscriptions : [],
    });

  return (
    <div className="col-md-12 pr-desk-2-mob-0">
      <div className="container sub-tab-container mt-4">
        <div className="table-subs-parent table-responsive w-nowrap">
          <table
            className="table subscription-table text-center"
            {...getTableProps()}
          >
            <thead className="sub-table-head mb-2">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="c-pointer br-none"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="subs-tab-body" {...getTableBodyProps()}>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <img
                      src={NoDataImage}
                      alt="no data"
                      style={{
                        height: "50vh",
                      }}
                    />
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="bg-white c-pointer br-right"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TesgingTabel;
