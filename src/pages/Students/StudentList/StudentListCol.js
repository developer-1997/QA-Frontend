import React from "react"
import { Badge, UncontrolledTooltip } from "reactstrap"
import { Link } from "react-router-dom"
import * as moment from "moment"
import Avatar from "../../../assets/images/users/user_placeholder.png"

const staticURL = process.env.REACT_APP_STATIC_URL

const handleValidDate = date => {
  const date1 = moment(new Date(date)).format("DD MMM Y")
  return date1
}

const Name = cellProps => {
  return (
    <>
      <div className="d-flex align-items-center">
        {!cellProps.image ? (
          <div>
            {/* <span className="avatar-title rounded-circle">
                {cellProps?.name?.charAt(0)}
              </span> */}
            <img
              src={Avatar}
              alt=""
              height="52"
              width="52"
              className="tr_img_user"
            />
          </div>
        ) : (
          <div>
            <img
              className="avatar-sm tr_img"
              src={staticURL + cellProps.image}
              alt=""
            />
          </div>
        )}
        <div className="ms-4 list_title_name">{cellProps?.name}</div>
      </div>
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
    <div className="form-check form-switch form-switch-md d-flex justify-content-center">
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
          const student = cellProps.row.original
          onClickEdit(student)
        }}
      >
        {/* <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
        <UncontrolledTooltip placement="top" target="edittooltip">
          Edit
        </UncontrolledTooltip> */}

        <Link to={`/students-edit/${cellProps.row.original._id}`}>
          <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            Edit
          </UncontrolledTooltip>
        </Link>
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
      <span
        className="text-success"
        onClick={() => {
          const test = cellProps.row.original
          onClickEdit(test)
        }}
      >
        <Link to={`/student-details/${cellProps.row.original._id}`}>
          <i className="mdi mdi-eye-outline font-size-18" id="edittooltip" />
          <UncontrolledTooltip placement="top" target="edittooltip">
            View
          </UncontrolledTooltip>
        </Link>
      </span>
    </div>
  )
}

export { Name, CourseId, DateFormate, Status, Action, StatusChangeToggle }
