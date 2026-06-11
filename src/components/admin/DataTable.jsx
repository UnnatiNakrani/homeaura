import React from "react";

function DataTable({
    columns = [],
    data = [],
    actions,
}) {
    return (
        <div className="admin-table">
            <div className="table-responsive">
                <table className="table align-middle mb-0">

                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key}>
                                    {column.label}
                                </th>
                            ))}

                            {actions && (
                                <th width="180">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>

                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <tr key={row.id || index}>

                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            {column.render
                                                ? column.render(row)
                                                : row[column.key]}
                                        </td>
                                    ))}

                                    {actions && (
                                        <td>
                                            {actions(row)}
                                        </td>
                                    )}

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={
                                        columns.length +
                                        (actions ? 1 : 0)
                                    }
                                    className="text-center py-4"
                                >
                                    No Data Found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default DataTable;