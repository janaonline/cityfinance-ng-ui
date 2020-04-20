export default class FileUpload {
  get uploading(): boolean {
    return this._uploading;
  }

  set uploading(value: boolean) {
    this._uploading = value;
  }

  get currentUploadedFiles(): number {
    return this._currentUploadedFiles;
  }

  set currentUploadedFiles(value: number) {
    this._currentUploadedFiles = value;
  }

  get totalFiles(): number {
    return this._totalFiles;
  }

  set totalFiles(value: number) {
    this._totalFiles = value;
  }

  private _totalFiles: number;
  private _currentUploadedFiles: number = 0;
  private _uploading: boolean = false;

  reset() {
    this.uploading = false;
    this.currentUploadedFiles = 0;
    this.totalFiles = 0;
  }

}
