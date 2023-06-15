import React from "react"
import { Badge, UncontrolledTooltip } from "reactstrap"
import { Link } from "react-router-dom"
import * as moment from "moment"

const handleValidDate = date => {
  const date1 = moment(new Date(date)).format("DD MMM Y")
  return date1
}

const Name = cell => {
  return (
    <>
      <h5 className="text-truncate font-size-14">
        <Link
          to={`/tests-overview/${cell.row.original._id}`}
          className="text-dark"
        >
          {cell.value}
        </Link>
      </h5>
    </>
  )
}

const CourseId = cell => {
  return cell.value ? cell.value : "NA"
}

const DateFormate = cell => {
  return cell.value ? handleValidDate(cell.value) : ""
}

const Status = cell => {
  switch (cell.value) {
    case "active":
      return <Badge className="bg-success badge_active">Active</Badge>
    case "deactive":
      return <Badge className="bg-danger badge_deactive">Deactive</Badge>
  }
}

const StatusChangeToggle = ({ cellProps, handleChangeStatus }) => {
  return (
    <div className="form-check form-switch form-switch-md">
      <input
        type="checkbox"
        className="form-check-input"
        id={cellProps.row.original._id}
        defaultChecked={cellProps.row.original.status === "active"}
        onChange={() => {
          const test = cellProps.row.original
          handleChangeStatus(test)
        }}
      />
      <label className="form-check-label" htmlFor="customSwitchsizemd"></label>
    </div>
  )
}

const Action = ({ cellProps, onClickDelete, onClickEdit }) => {
  return (
    <div className="d-flex gap-3 action_container">
      <span
        className="text-success"
        onClick={() => {
          const test = cellProps.row.original
          onClickEdit(test)
        }}
      >
        <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
        <UncontrolledTooltip placement="top" target="edittooltip">
          Edit
        </UncontrolledTooltip>
      </span>
      <span
        className="text-success"
        onClick={() => {
          const test = cellProps.row.original
          onClickEdit(test)
        }}
      >
        <i className="mdi mdi-eye-outline font-size-18" id="edittooltip" />
        <UncontrolledTooltip placement="top" target="edittooltip">
          View
        </UncontrolledTooltip>
      </span>
      {/* <span
        className="text-danger"
        onClick={() => {
          const test = cellProps.row.original
          onClickDelete(test)
        }}
      >
        <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
        <UncontrolledTooltip placement="top" target="deletetooltip">
          Delete
        </UncontrolledTooltip>
      </span> */}
    </div>
  )
}

export { Name, CourseId, DateFormate, Status, Action, StatusChangeToggle }
