import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table"
import { Table, Row, Col, Button, Input, CardBody } from "reactstrap"
import { Filter, DefaultColumnFilter } from "./filters"
import JobListGlobalFilter from "../../components/Common/GlobalSearchFilter"

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2  my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={e => {
                  setValue(e.target.value)
                  onChange(e.target.value)
                }}
                id="search-bar-0"
                type="text"
                className="form-control custom_searchbox"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
      {isJobListGlobalFilter && <JobListGlobalFilter />}
    </React.Fragment>
  )
}

const TableContainer = ({
  loading,
  columns,
  data,
  isGlobalFilter,
  isJobListGlobalFilter,
  isAddOptions,
  isAddUserList,
  handleOrderClicks,
  handleUserClick,
  handleCustomerClick,
  isAddCustList,
  customPageSize,
  className,
  customPageSizeOptions,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  )

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }

  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }
  return (
    <Fragment>
      <Row className="mb-2">
        <Col md={customPageSizeOptions ? 2 : 1}>
          <select
            className="form-select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[5, 10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </Col>
        {isGlobalFilter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            isJobListGlobalFilter={isJobListGlobalFilter}
          />
        )}
      </Row>

      <div className="table-responsive react-table">
        <Table className={className}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th key={column.id} scope="col">
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, ind) => {
              prepareRow(row)
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell, index) => {
                      if (cell.column.Header === "#") {
                        return (
                          <td key={index} {...cell.getCellProps()}>
                            {pageIndex * pageSize + ind + 1}
                          </td>
                        )
                      }
                      return (
                        <td
                          key={index}
                          // index={index}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      )
                    })}
                  </tr>
                </Fragment>
              )
            })}
          </tbody>
        </Table>
      </div>

      {loading && (
        <Row>
          <Col xs="12">
            <div className="text-center my-3">
              <div className="text-success">
                <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                Load more
              </div>
            </div>
          </Col>
        </Row>
      )}

      {!loading && data.length === 0 && (
        <Row>
          <Col xs="12">
            <div className="text-center my-3">
              <div className="text-success">No Data Found</div>
            </div>
          </Col>
        </Row>
      )}

      <div className="d-flex justify-content-md-end justify-content-center align-items-center">
        <Button
          className="btn_pagination rounded-start"
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>

        <div className="d-flex justify-content-md-start justify-content-center align-items-center">
          <Button
            className="btn_pagination border-start-0"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {pageIndex}
          </Button>

          <div className="pagination_curr_page border-top-0">
            {pageIndex + 1}
          </div>

          <Button
            className="btn_pagination border-end-0"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {pageIndex + 2}
          </Button>
        </div>

        <Button
          className="btn_pagination rounded-end"
          onClick={nextPage}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>

      {/* <Row className="justify-content-md-end justify-content-center align-items-center">
        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              className="btn_pagination"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              className="btn_pagination"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </div>
        </Col>
        <Col className="col-md-auto d-none d-md-block">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col className="col-md-auto">
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>

        <Col className="col-md-auto">
          <div className="d-flex gap-1">
            <Button
              color="primary"
              className="btn_pagination"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
            <Button
              className="btn_pagination"
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </Button>
          </div>
        </Col>
      </Row> */}
    </Fragment>
  )
}

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default TableContainer
