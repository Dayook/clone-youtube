import React, { useState } from "react";
import {
  Typography,
  Button,
  Form,
  message,
  Input,
  Icon,
  Descriptions,
} from "antd";
import Dropzone from "react-dropzone";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Film & Animation" },
  { value: 3, label: "Film & Animation" },
];

function VideoUploadPage() {
  // 사용할 value들을 state에 넣어 놓은 후에
  // server에 한꺼번에 보내줄 수 있음
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) =>{
    setPrivate(e.currentTarget.value)
  }
  
  const onCategoryChange = (e) =>{
    setCategory(e.currentTarget.value)
  }

  return (
    <div>
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}>Upload Video</Title>
        </div>
        <Form onSubmit>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Drop zone */}
            <Dropzone onDrop multiple>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Icon type="plus" style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>
            <div>
              <img src alt></img>
            </div>
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input onChange={onTitleChange} value={VideoTitle}></Input>

          <label>Description</label>
          <TextArea
            onChange={onDescriptionChange}
            value={Description}
          ></TextArea>
          <br />
          <br />

          <select onChange={onPrivateChange}>
            {PrivateOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <br />
          <br />
          <select onChange={onCategoryChange}>
            {CategoryOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />
          <Button type="primary" size="large" onClick>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

// 단축키 rfce
// 다른 파일에도 이용할 수 있도록 export.
export default VideoUploadPage;
