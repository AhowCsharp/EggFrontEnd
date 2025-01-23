import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 引入樣式檔案

const RichTextEditor = ({ value, onChange }) => {

  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onChange}
        placeholder="請輸入郵件內容"
        theme="snow"
      />
    </div>
  );
};

export default RichTextEditor;
