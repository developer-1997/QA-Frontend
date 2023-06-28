import React, { useState } from "react"

const CheckBox = ({ validation, setFieldValue, option }) => {
  const [check, setCheck] = useState(false)

  const submit = () => {
    setFieldValue("answer", option)
    setCheck(data => !data)
  }
  return (
    <div className="form-check mb-2">
      <input
        className={`form-check-input question_option_radio ${
          validation.touched.answer && validation.errors.answer
            ? "is-invalid"
            : ""
        }`}
        type="radio"
        name="answer"
        checked={validation.values.answer === option}
        onClick={submit}
      />
    </div>
  )
}

export default CheckBox
