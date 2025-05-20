import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  ["link", "formula"],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

type Props = {
  value: string;
  setValue: (value: string) => void;
  isDisabled?: boolean;
};

const RichTextEditor = ({ value, setValue, isDisabled = false }: Props) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={{ toolbar: toolbarOptions }}
      readOnly={isDisabled}
    />
  );
};

export default RichTextEditor;
