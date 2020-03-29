export interface S3FileURLResponse {
  success: boolean;
  message: string;
  data: [
    {
      file_name: string;
      mime_type: string;
      host: string;
      url: string;
      file_alias: string;
    }
  ];
}
