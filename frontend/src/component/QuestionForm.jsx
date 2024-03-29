import React, { useEffect, useState, useCallback } from 'react';
import Questiontable from './QuestionTable';
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from './api';
const QuestionForm = () => {
    const [questions, setQuestions] = useState([]);
    const [isEdit, setIsEdit] = useState({
        key: false,
        _id: null
    });
    const [formData, setFormData] = useState({
        name: '',
        type: 'text',
        requirement: false,
        sequence: 1,
        options: null,
    });
    const [fieldOptions, setFieldOptions] = useState(["Option1"]);
    const [isModalOpen, setIsModalOpen] = useState({
        key: false,
        data: null,
        _id: null
    });
    const [validation, setValidation] = useState({
        name: null,
        type: null,
        requirement: null,
        sequence: null,
        options: null,
    })

    const loadQuestions = async () => {
        try {
            let questionsData = await getQuestions();
            questionsData = questionsData.sort((a, b) => a.sequence - b.sequence);
            setQuestions(questionsData);
            closeModal();
            setFormData((pervState) => ({
                name: '',
                type: 'text',
                requirement: false,
                sequence: questionsData.length>0 ? questionsData[questionsData.length - 1].sequence + 1 : 1,
                options: null,
            }));
        } catch (error) {
            console.error("Error loading questions:", error);
        }
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear validation error when the user starts typing
        setValidation((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleOptionChange = (index, value) => {
        setFieldOptions([...fieldOptions.slice(0, index), value, ...fieldOptions.slice(index + 1)]);
    };

    const hadlleDeleteOption = (index) => {
        setFieldOptions([...fieldOptions.slice(0, index), ...fieldOptions.slice(index + 1)]);
    }

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        if (formData.name.trim() === '') {
            setValidation((prevValidation) => ({ ...prevValidation, name: 'Please enter a question title.' }));
            return;
        }
        if (isEdit.key) {
            console.log(formData);
            const questionData = { ...formData, options: (formData.type === 'checkbox' || formData.type === 'radio') ? fieldOptions : null };
            await updateQuestion(isEdit._id, questionData);
            setIsEdit({
                key: false,
                _id: null
            });
        } else {
            const questionData = { ...formData, options: (formData.type === 'checkbox' || formData.type === 'radio') ? fieldOptions : null };
            await addQuestion(questionData);
        }
        setFieldOptions(["Option1"]);
        loadQuestions();
    };

    const handleUpdateQuestion = (_id, el) => {
        setIsEdit({
            key: true,
            _id: _id
        });
        setFormData(() => ({ ...el, options: null }));
        el.options && setFieldOptions(el.options);
    }
    const handleDeleteQuestion = async (_id) => {
        await deleteQuestion(_id);
        closeModal();
        loadQuestions();
    }
    const openModal = (_id, el) => {
        setIsModalOpen((prevState) => ({
            key: true,
            data: el,
            _id: _id
        }));
    };

    const closeModal = () => {
        setIsModalOpen({
            key: false,
            data: null,
            _id: null
        });
    };


    return (
        <>
            <form onSubmit={handleAddQuestion}>
                <div className="row mt-2 mb-2">
                    <div className="col-4 p-2">
                        <label className="form-label">
                            Title:
                        </label>
                        <div className='d-flex flex-column justify-content-between' style={{ gap: '5px' }}>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder='Enter Question Title'
                            />
                            {validation.name && <span className='text-danger ps-2 fs-6'><i className="bi bi-exclamation-circle-fill me-1"></i>{validation.name}</span>}

                        </div>
                    </div>
                    <div className='col-4 p-2'>
                        <label className="form-label">
                            Type:
                        </label>
                        <select name="type" className="form-select" value={formData.type} onChange={handleInputChange}>
                            <option value="text">Text</option>
                            <option value="textarea">Textarea</option>
                            <option value="date">Date</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio Button</option>
                            <option value="file">Upload File</option>
                        </select>
                    </div>
                    <div className="col-4 p-2">
                        <label className="form-label">
                            Sequence/Number:
                        </label>
                        <input
                            className="form-control"
                            type="number"
                            name="sequence"
                            value={formData.sequence}
                            onChange={handleInputChange}
                            placeholder='Enter Question Sequence/Number'
                        />
                    </div>
                </div>
                {formData.type === 'radio' || formData.type === 'checkbox' ? (
                    <>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h3 className='mt-2 mb-2'>Options</h3>
                            <button type='button' className='btn btn-primary' onClick={() => handleOptionChange(fieldOptions.length, `Option${fieldOptions.length + 1}`)}>
                                Add Option
                            </button>
                        </div>

                        <div className='row mt-2 mb-2'>
                            {fieldOptions.length > 0 && fieldOptions.map((option, index) => (
                                <div className="col-4 p-2" key={index}>
                                    <label className="form-label">
                                        {`Question Option${index + 1} :`}
                                    </label>
                                    <div className='d-flex justify-content-between align-items-center' style={{ gap: "10px" }}>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}

                                        />
                                        {fieldOptions.length > 2 && <i class="bi bi-x-lg fs-3 text-danger" style={{ cursor: "pointer" }} onClick={() => hadlleDeleteOption(index)}></i>}

                                    </div>

                                </div>
                            ))}
                        </div>
                    </>
                ) : null}
                <div className="col-4">
                    <input
                        type="checkbox"
                        name="requirement"
                        checked={formData.requirement}
                        onChange={handleInputChange}
                        className="form-check-input fs-3"
                    />
                    <label className="form-check-label fs-3 ms-2" htmlFor="exampleCheck1">
                        Is Question Required
                    </label>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                    Add Question
                </button>
            </form>
            <div>
                <h2 className='text-center mt-3 mb-4'>Questions List</h2>
                <Questiontable tbData={questions} openModal={(_id, el) => openModal(_id, el)} handleUpdateQuestion={(_id, el) => handleUpdateQuestion(_id, el)} />

            </div>
            {isModalOpen.key && (
                <div className={`modal fade`} style={{ display: "contents" }}>
                    <div className="modal-dialog" style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '450px',
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" >
                                    {isModalOpen.data.name}
                                </h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure to delete..
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="button" onClick={() => handleDeleteQuestion(isModalOpen._id)} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default QuestionForm;