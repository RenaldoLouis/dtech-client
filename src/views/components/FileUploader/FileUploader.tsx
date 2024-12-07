// import { UploadOutlined } from "@ant-design/icons";
// import { Button, Upload, message } from "antd";
// import { useTranslation } from "react-i18next";

// // NOTE : handleUpload is a function that takes file as an input (in case of single file)

// interface FileUploaderProps {
//   className?: string | undefined;
//   fileSizeLimitInMB?: number;
//   acceptedFileFormat?: string[];
//   handleUpload: any;
//   text?: string | undefined;
//   disabled?: boolean | undefined;
// }

// export const acceptedFileTypeList = {
//   BULK_UPLOAD: [".csv"],
//   IMAGE: ["image/*"],
//   PDF: [".pdf"],
// };

// const FileUploader = ({
//   disabled = false,
//   className = undefined,
//   handleUpload,
//   acceptedFileFormat = [],
//   fileSizeLimitInMB = 500,
//   text = undefined,
// }: FileUploaderProps) => {
//   const { t } = useTranslation();
//   const handleBeforeUpload = (file: any) => {
//     const isValidFileSize = file.size / 1024 / 1024 <= fileSizeLimitInMB;

//     if (!isValidFileSize) {
//       message.error(`Maximum file size allowed : ${fileSizeLimitInMB} MB`);
//     }

//     return isValidFileSize;
//   };

//   return (
//     <Upload
//       name="fileUpload"
//       maxCount={1}
//       accept={acceptedFileFormat.join(",")}
//       action={handleUpload}
//       beforeUpload={handleBeforeUpload}
//       showUploadList={false}
//       className={className}
//     >
//       <Button
//         disabled={disabled}
//         block
//         type="primary"
//         size="large"
//         icon={<UploadOutlined />}
//       >
//         {text ?? t("UPLOAD")}
//       </Button>
//     </Upload>
//   );
// };

// export default FileUploader;
