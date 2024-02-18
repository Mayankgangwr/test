import React from "react";

const Questiontable = (props) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Options</th>
                    <th scope="col">isRequired</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {props.tbData.sort((a, b) => a.sequence - b.sequence).map((el, index) => (
                    <tr key={index}>
                        <th scope="row">{el.sequence}</th>
                        <td>{el.name}</td>
                        <td>{el.type}</td>
                        <td>{el.options && <ul>
                            {el.options.map((option, optionIndex) => (
                                <li key={optionIndex}>{option}</li>
                            ))}
                        </ul>}</td>
                        <td>
                            {el.requirement ?
                                <i className="bi bi-check-circle-fill text-primary fs-4"></i>
                                :
                                <i className="bi bi-check-circle fs-4"></i>
                            }
                        </td>
                        <td>
                            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
                                <i onClick={() => props.openModal(el._id, el)} className="bi bi-trash3-fill text-danger fs-4" style={{ cursor: "pointer" }}></i>
                                <i onClick={() => props.handleUpdateQuestion(el._id, el)} className="bi bi-pencil-square text-primary fs-4" style={{ cursor: "pointer" }}></i>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    );
}
export default Questiontable