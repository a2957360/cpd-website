import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Modal, Space, message, Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { SubmitAssessmentAnswers,clearAssessment } from "../../../redux/actions/course";
import { CheckOutlined } from '@ant-design/icons';

const {confirm} = Modal;
const assessmentData = [
  {
    question: '1. This is a question demo, we need a sentence to show the effects for UI?',
    options: [
      'This is the 1 answer, please mark if this one is correct.',
      'This is the 2 answer, please mark if this one is correct.',
      'This is the 3 answer, please mark if this one is correct.',
      'This is the 4 answer, please mark if this one is correct.'
    ]
  },
  {
    question: '1. This is a question demo, we need a sentence to show the effects for UI?',
    options: [
      'This is the 1 answer, please mark if this one is correct.',
      'This is the 2 answer, please mark if this one is correct.',
      'This is the 3 answer, please mark if this one is correct.',
      'This is the 4 answer, please mark if this one is correct.'
    ]
  },
  {
    question: '1. This is a question demo, we need a sentence to show the effects for UI?',
    options: [
      'This is the 1 answer, please mark if this one is correct.',
      'This is the 2 answer, please mark if this one is correct.',
      'This is the 3 answer, please mark if this one is correct.',
      'This is the 4 answer, please mark if this one is correct.'
    ]
  },
  {
    question: '1. This is a question demo, we need a sentence to show the effects for UI?',
    options: [
      'This is the 1 answer, please mark if this one is correct.',
      'This is the 2 answer, please mark if this one is correct.',
      'This is the 3 answer, please mark if this one is correct.',
      'This is the 4 answer, please mark if this one is correct.'
    ]
  }
]

const Assessment = ({ data, type,refreshCourse }) => {
  const dispatch = useDispatch();
  const { Questions,MaxScore } = data;

  const [answerObj, setAnswerObj] = useState({})
  const [answer, setAnswer] = useState([])
  const [loading, setLoading] = useState(false);
  const { submitAssess } = useSelector((state) => state.courseData);

  const onChange = (e, index, QuestionID) => {
    // let formData = new FormData();
    let Obj = {...answerObj};
    let objItem = "radio"+QuestionID;
    let objAnswer = "radio_one"+e.target.value;
    Obj[objItem] = objAnswer;
    setAnswerObj(Obj);
    let array = [...answer];
    array[index] = e.target.value;
    setAnswer(array);
  };
  const handleSubmit =() => {
    setLoading(true)
    let formData = new FormData();
    Object.keys(answerObj ?? {}).forEach((key, value) => {
      formData.append(key, answerObj[key]);
    });
    formData.append('userid', localStorage.getItem("CPDUserID"));
    formData.append('courseid', data.CourseID);
    if(type) {
      formData.append('fromPackage', 1);
    }else {
      formData.append('fromPackage', 0);
    }
    if(answer.length !== Questions.length) {
      setLoading(false);
      message.error("Not All Questions Answered.");
    }else {
      dispatch(SubmitAssessmentAnswers(formData));
      setLoading(false);
    }
  }
  useEffect(() => {
    if(submitAssess) {
      // console.log(submitAssess)
      if(submitAssess.PercentageCompleted >= submitAssess.RequiredPassPercentage){
        refreshCourse();
        confirm({
          title: 'Your Score '+submitAssess.PercentageCompleted,
          cancelText: null,
          okText: "Finish",
          icon: <CheckOutlined />,
          content: `Your have successfully achieved a score higher than the required ${submitAssess.RequiredPassPercentage}%, your certificate is available in My Certificates tab.`,
          onOk() {
          },
        });
      }else{
        confirm({
          title: 'Your Score '+submitAssess.PercentageCompleted,
          cancelText: null,
          okText: "retry",
          // icon: <ExclamationCircleOutlined />,
          content: `Assesment is incomplete - you need to achieve at least ${submitAssess.RequiredPassPercentage}%, to receive CPE and certificate`,
          onOk() {
            console.log('OK');
          },
        });
      }
      dispatch(clearAssessment())
    }
  },[submitAssess])
  // console.log("111111",Questions);
  return (
    <div className='section-card border-radius-8 bg-white mt-4'>
      <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>Take Assessment 
      <span className='color-green float-right'>Highest Score : {MaxScore<submitAssess?.PercentageCompleted?submitAssess.PercentageCompleted:MaxScore}%</span>
      </div>
      <div className='rectangle rectangle--light rectangle--small card-rectangle' />

      {Questions?.map((items, index) => {
        const { QuestionName, QuestionsAnswers, QuestionID } = items;

        return (
          <div key={index} className='mb-5'>
            <div className='color-dark-grey-2 fs-16 mx-5 mt-3 mb-3' dangerouslySetInnerHTML = {{ __html: QuestionName }} ></div>

            <div className='mx-5 mt-3 mb-3 pl-5 radio--primary'>
              <Radio.Group onChange={(e) => onChange(e, index, QuestionID)} value={answer[index]}>
                <Space direction="vertical">
                  {QuestionsAnswers.map((item, index) => {
                    const { QuestionOptionID, QuestionOption } = item;
                    return (
                      <Radio require key={QuestionOptionID} className='color-dark-grey-1 fs-16' value={QuestionOptionID}>{QuestionOption}</Radio>
                    )
                  })}
                </Space>
              </Radio.Group>
            </div>
          </div>
        )
      })}

      <div className="d-flex align-items-end justify-content-center mt-20 mb-40">
        <Button
          role="button"
          className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
          onClick={() => handleSubmit()}
          loading={loading}
        >
          Check Result
        </Button>
      </div>
    </div>
  )
}

export default Assessment;
